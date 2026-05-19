# FoodFinder — Restaurant Catalog

FoodFinder is a full-stack restaurant discovery app for Almaty and Astana. Browse and filter restaurants by cuisine and price, view full menus, manage a shopping cart, and get personalized recommendations from an AI assistant powered by Claude.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 16 (App Router), React 19, Tailwind CSS v4, SWR |
| **Backend** | Express.js, TypeScript, better-sqlite3 (SQLite) |
| **AI** | OpenAI (`gpt-4o-mini` по умолчанию), `openai` SDK, tool calling, `react-markdown` |
| **Testing** | Jest + ts-jest + Supertest (API), Playwright (E2E) |

---

## Local Setup

### Prerequisites

- Node.js 20+
- npm 10+

### 1. Clone the repository

```bash
git clone https://github.com/Adilbek-S/food-ai-catalog.git
cd food-ai-catalog
```

### 2. Start the backend

```bash
cd backend
npm install
PORT=3001 npm run dev
```

The API will be available at `http://localhost:3001`. The SQLite database is created and seeded automatically on first run.

### 3. Configure and start the frontend

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
```

Then start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run tests

```bash
# Backend unit / integration tests (no running server needed)
cd backend && npm test

# Frontend E2E tests (requires both servers running)
cd frontend && npx playwright install chromium   # first time only
cd frontend && npm run test:e2e
```

---

## Environment Variables

| Variable | Location | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `frontend/.env.local` | Backend API URL (default: `http://localhost:4000`) |
| `OPENAI_API_KEY` | `frontend/.env.local` | API key for the OpenAI chatbot |
| `OPENAI_MODEL` | `frontend/.env.local` | OpenAI model name (default: `gpt-4o-mini`) |
| `PORT` | shell / `backend/.env` | Backend port (default: `4000`) |
| `FRONTEND_URL` | `backend/.env` | Allowed CORS origin (default: `http://localhost:3000`) |

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/restaurants` | List restaurants (filters: `cuisine`, `city`, `price_range`) |
| `GET` | `/restaurants/:id` | Get a single restaurant |
| `GET` | `/restaurants/:id/menu` | Get menu grouped by category |
| `POST` | `/cart` | Add item to cart |
| `GET` | `/cart` | List cart items |
| `DELETE` | `/cart/:id` | Remove cart item |

---

## Deploy

| Service | Link |
|---|---|
| **Frontend** | [food-ai-catalog.vercel.app](https://food-ai-catalog.vercel.app) |
| **Backend** | [food-ai-catalog.up.railway.app](https://food-ai-catalog.up.railway.app) |

---
