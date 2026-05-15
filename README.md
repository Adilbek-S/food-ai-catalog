# FoodFinder — Restaurant Catalog

FoodFinder is a full-stack restaurant discovery app for Almaty and Astana. Browse and filter restaurants by cuisine and price, view full menus, manage a shopping cart, and get personalized recommendations from an AI assistant powered by Claude.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 16 (App Router), React 19, Tailwind CSS v4, SWR |
| **Backend** | Express.js, TypeScript, better-sqlite3 (SQLite) |
| **AI** | Anthropic Claude (`claude-haiku-4-5`), `@anthropic-ai/sdk`, tool calling |
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
ANTHROPIC_API_KEY=your_anthropic_api_key_here
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
| `ANTHROPIC_API_KEY` | `frontend/.env.local` | API key for the Claude AI chatbot |
| `PORT` | shell / `.env` | Backend port (default: `4000`, set to `3001` for frontend compatibility) |
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
| **Frontend** | [vercel-link] |
| **Backend** | [railway-link] |

---

## Screenshots

> _Screenshots coming soon._

<!-- Add screenshots here once deployed:
![Home page](docs/screenshots/home.png)
![Restaurant detail](docs/screenshots/detail.png)
![AI chatbot](docs/screenshots/chatbot.png)
-->
