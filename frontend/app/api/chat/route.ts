import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const BACKEND = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
const MODEL = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';

const tools: OpenAI.Chat.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'search_restaurants',
      description: 'Search for restaurants by cuisine, price range, or city',
      parameters: {
        type: 'object',
        properties: {
          cuisine: {
            type: 'string',
            description: 'Cuisine type: kazakh, italian, japanese, fastfood, georgian',
          },
          max_price_range: {
            type: 'number',
            description: 'Maximum price range (1=cheap, 2=medium, 3=expensive)',
          },
          city: {
            type: 'string',
            description: 'City name, e.g. Almaty or Astana',
          },
        },
        required: [],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_menu',
      description: 'Get the menu for a specific restaurant by its ID',
      parameters: {
        type: 'object',
        properties: {
          restaurant_id: {
            type: 'number',
            description: 'The restaurant ID',
          },
        },
        required: ['restaurant_id'],
      },
    },
  },
];

async function runTool(name: string, input: Record<string, unknown>): Promise<string> {
  if (name === 'search_restaurants') {
    const params = new URLSearchParams();
    if (input.cuisine) params.set('cuisine', String(input.cuisine));
    if (input.max_price_range) params.set('price_range', String(input.max_price_range));
    if (input.city) params.set('city', String(input.city));
    const url = `${BACKEND}/restaurants${params.size ? `?${params}` : ''}`;
    const res = await fetch(url);
    if (!res.ok) return JSON.stringify({ error: 'Failed to fetch restaurants' });
    return JSON.stringify(await res.json());
  }

  if (name === 'get_menu') {
    const res = await fetch(`${BACKEND}/restaurants/${input.restaurant_id}/menu`);
    if (!res.ok) return JSON.stringify({ error: 'Failed to fetch menu' });
    return JSON.stringify(await res.json());
  }

  return JSON.stringify({ error: `Unknown tool: ${name}` });
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const systemPrompt =
      'Ты — помощник FoodFinder. Помогаешь пользователям найти рестораны и блюда. ' +
      'Перед рекомендацией ВСЕГДА используй инструмент search_restaurants. ' +
      'Если пользователь просит меню — используй get_menu. ' +
      'Общайся на языке, на котором задан вопрос. Будь дружелюбным и кратким. ' +
      'Форматируй ответ с помощью markdown: используй **жирный** для названий, маркированные списки для перечислений. ' +
      'ВАЖНО: не вставляй картинки и ссылки на изображения.';

    const apiMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    ];

    let response = await client.chat.completions.create({
      model: MODEL,
      max_tokens: 1024,
      tools,
      messages: apiMessages,
    });

    while (response.choices[0].finish_reason === 'tool_calls') {
      const message = response.choices[0].message;
      apiMessages.push(message);

      const toolResults = await Promise.all(
        (message.tool_calls ?? []).map(async (call) => ({
          role: 'tool' as const,
          tool_call_id: call.id,
          content: await runTool(call.function.name, JSON.parse(call.function.arguments)),
        }))
      );

      apiMessages.push(...toolResults);

      response = await client.chat.completions.create({
        model: MODEL,
        max_tokens: 1024,
        tools,
        messages: apiMessages,
      });
    }

    const text =
      response.choices[0].message.content ?? 'Извините, не удалось получить ответ.';

    return Response.json({ response: text });
  } catch (err) {
    console.error('[chat]', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
