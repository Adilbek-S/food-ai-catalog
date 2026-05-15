import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const BACKEND = 'http://localhost:3001';

const tools: Anthropic.Tool[] = [
  {
    name: 'search_restaurants',
    description: 'Search for restaurants by cuisine, price range, or city',
    input_schema: {
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
  {
    name: 'get_menu',
    description: 'Get the menu for a specific restaurant by its ID',
    input_schema: {
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
    const data = await res.json();
    return JSON.stringify(data);
  }

  if (name === 'get_menu') {
    const id = input.restaurant_id;
    const res = await fetch(`${BACKEND}/restaurants/${id}/menu`);
    if (!res.ok) return JSON.stringify({ error: 'Failed to fetch menu' });
    const data = await res.json();
    return JSON.stringify(data);
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
      'Общайся на русском языке. Будь дружелюбным и кратким.';

    const apiMessages: Anthropic.MessageParam[] = messages.map(
      (m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })
    );

    let response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      system: systemPrompt,
      tools,
      messages: apiMessages,
    });

    while (response.stop_reason === 'tool_use') {
      const toolUseBlocks = response.content.filter(
        (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use'
      );

      const toolResults: Anthropic.ToolResultBlockParam[] = await Promise.all(
        toolUseBlocks.map(async (block) => ({
          type: 'tool_result' as const,
          tool_use_id: block.id,
          content: await runTool(block.name, block.input as Record<string, unknown>),
        }))
      );

      apiMessages.push({ role: 'assistant', content: response.content });
      apiMessages.push({ role: 'user', content: toolResults });

      response = await client.messages.create({
        model: 'claude-haiku-4-5',
        max_tokens: 1024,
        system: systemPrompt,
        tools,
        messages: apiMessages,
      });
    }

    const textBlock = response.content.find((b): b is Anthropic.TextBlock => b.type === 'text');
    const text = textBlock?.text ?? 'Извините, не удалось получить ответ.';

    return Response.json({ response: text });
  } catch (err) {
    console.error('[chat]', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
