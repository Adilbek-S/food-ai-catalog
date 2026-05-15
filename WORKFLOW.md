# AI Workflow Documentation

---

## Team & Roles

| Role | Name | Tools Used |
|---|---|---|
| **Backend Developer** | Solo (simulated team) | Claude Code, Context7 MCP, better-sqlite3 docs |
| **Frontend Developer** | Solo (simulated team) | Claude Code, Next.js 16 bundled docs, Tailwind CSS v4 |
| **AI Engineer** | Solo (simulated team) | Claude Code, Anthropic SDK docs, claude-api skill |
| **QA Engineer** | Solo (simulated team) | Claude Code, Playwright MCP, Jest + ts-jest |

---

## AI IDE Used

**Claude Code** (Anthropic CLI) was the primary development environment throughout the project.

### What was generated with Claude Code

- **Database schema** — `CREATE TABLE` definitions for `restaurants`, `menu_items`, and `cart` with constraints and foreign keys
- **Seed data** — 10 restaurants across 5 cuisines (60+ menu items) with realistic Kazakh names, addresses, and prices
- **Backend API routes** — all Express route handlers (`GET /restaurants` with filtering, `GET /restaurants/:id`, `GET /restaurants/:id/menu`, `POST/GET/DELETE /cart`) and error middleware
- **Frontend UI** — full Next.js App Router app: `NavBar`, `FilterBar`, `RestaurantCard`, `SkeletonCard`, `CartSidebar`, `MenuSection`, `RestaurantGrid`, home page, restaurant detail page
- **Cart state management** — `CartContext` with SWR integration and optimistic UI updates
- **AI chatbot** — `ChatBot.tsx` component (floating button, chat window, typing indicator) and `/api/chat` route handler with an agentic tool-calling loop
- **Tests** — Jest + Supertest API test suite (8 tests) and Playwright E2E suite (4 tests)
- **Documentation** — `README.md`, `WORKFLOW.md`, `/ai-rules/backend_Adilbek.md`

---

## MCP & Tools

### Context7 MCP
Used to pull up-to-date documentation for libraries during generation:
- **Express.js** — Router API, middleware signature, error handler arity
- **better-sqlite3** — synchronous `.prepare().all()` / `.get()` / `.run()` API, named parameters with `@param` syntax, `db.transaction()`
- **Anthropic SDK (TypeScript)** — `client.messages.create()`, `ToolUseBlock`, `ToolResultBlockParam`, agentic loop pattern

### Playwright MCP
Used as reference when writing the E2E test suite:
- `page.waitForResponse()` pattern for intercepting SWR fetches to the backend
- `Promise.all([waitForResponse, click])` to avoid race conditions on filter interactions
- `locator.nth(n).waitFor()` for asserting minimum card count after async data load

---

## Team Reflection

### 1. Где AI сэкономил больше всего
- **Генерация seed-данных** — вручную придумать 10 ресторанов с реалистичными названиями, адресами, описаниями и 60+ блюдами заняло бы часы; Claude сгенерировал всё за один запрос.
- **API routes** — шаблонный CRUD-код с фильтрацией, JOIN-запросами и обработкой ошибок появился сразу в рабочем виде без итераций.
- **UI-компоненты** — все карточки, скелетоны, боковая панель корзины и фильтры были созданы с правильными Tailwind-классами и адаптивной вёрсткой с первой попытки.

### 2. Где AI ошибался
- **Неправильные import-пути** — первоначально backend использовал встроенный `node:sqlite` вместо `better-sqlite3`; потребовалась миграция API (`.pragma()` вместо `PRAGMA ...` в exec, именованные параметры `@param` вместо `:param`).
- **Устаревший API Next.js** — Claude знал Next.js 14, тогда как в проекте использовался Next.js 16.x canary. Параметры динамических роутов (`params`) стали `Promise<{id: string}>` вместо `{id: string}`, что потребовало чтения актуальной документации из `node_modules/next/dist/docs/`.

### 3. Что без AI заняло бы ×3 дольше
- **Настройка SQLite-схемы** — продумать типы, ограничения (`CHECK`, `ON DELETE CASCADE`), `WAL`-режим и транзакционный seed без подсказок было бы значительно медленнее.
- **Tailwind-стили** — подобрать согласованную цветовую палитру (slate-900, orange-500), адаптивные сетки и анимации вручную потребовало бы многих итераций.
- **Tool-calling логика** — реализация агентного цикла (`stop_reason === 'tool_use'` → выполнить инструменты → передать результаты обратно) без готового примера из документации SDK была бы трудозатратной.

---

## AI-generated Commits

| Hash | Message |
|---|---|
| `638b25e` | `food-ai-catalog` — initial project scaffold (backend + frontend structure, DB schema, seed data, all routes, full UI) |
| `18e15df` | `add ai assistant` — ChatBot component, `/api/chat` route with agentic tool-calling loop, layout integration |
| `b24fe9c` | `add tests: Jest+supertest for backend API, Playwright E2E for frontend` — app/index split, jest.config.js, playwright.config.ts, all test files |

---

## Definition of Done Checklist

- [x] Backend REST API implemented (Express + better-sqlite3, all 6 endpoints)
- [x] Database seeded with 10 restaurants and 60+ menu items across 5 cuisines
- [x] Frontend UI implemented (Next.js 16 App Router, Tailwind CSS v4, SWR)
- [x] Restaurant filtering by cuisine and price range
- [x] Restaurant detail page with menu grouped by category
- [x] Shopping cart with add / remove / clear, persistent via backend
- [x] AI chatbot integrated (Claude `claude-haiku-4-5`, tool calling for search + menu)
- [x] Backend integration tests (Jest + Supertest, 8 tests, all passing)
- [x] Frontend E2E tests (Playwright, 4 tests covering title, cards, filter, navigation)
- [x] All code committed and pushed to GitHub
- [x] AI workflow documented (`/ai-rules/backend_Adilbek.md`, `WORKFLOW.md`)
- [x] Project documented (`README.md` with setup, API reference, env vars)
