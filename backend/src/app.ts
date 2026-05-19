import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import restaurantsRouter from './routes/restaurants';
import cartRouter from './routes/cart';
import './seed';

const app = express();

const allowedOrigins = (process.env.FRONTEND_URL ?? 'http://localhost:3000')
  .split(',')
  .map((o) => o.trim());

app.use(cors({ origin: (origin, cb) => {
  if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
  cb(new Error(`CORS: origin ${origin} not allowed`));
}}));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/restaurants', restaurantsRouter);
app.use('/cart', cartRouter);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;
