# Role
AI Engineer

# System Rules
- Model: claude-haiku-4-5 only (fast, cost-efficient)
- ALWAYS call a tool before generating a response — never answer from memory
- Tool calls must use actual data from backend API
- System prompt must define exact tool usage rules
- No GPT API or other providers
- Conversation history must be passed on every request (stateless API)

# MCP & Tools
- Anthropic API via fetch in Next.js API route
- Tool: search_restaurants — filters restaurants by cuisine/price/city
- Tool: get_menu — returns full menu for a restaurant_id

# Subagents
None in current implementation

# Output Contracts
- Tool input/output: JSON schema validated
- Chat API request: { messages: Message[], system?: string }
- Chat API response: { reply: string }