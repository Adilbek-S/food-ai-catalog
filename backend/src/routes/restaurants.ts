import { Router, Request, Response } from 'express';
import db from '../db';
import type { Restaurant, MenuItem } from '../types/restaurant';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const { cuisine, city, price_range } = req.query as Record<string, string | undefined>;

  let sql = 'SELECT * FROM restaurants WHERE 1=1';
  const params: Record<string, unknown> = {};

  if (cuisine) {
    sql += ' AND cuisine = @cuisine';
    params.cuisine = cuisine;
  }
  if (city) {
    sql += ' AND city = @city';
    params.city = city;
  }
  if (price_range) {
    const pr = Number(price_range);
    if (!Number.isNaN(pr) && pr >= 1 && pr <= 3) {
      sql += ' AND price_range = @price_range';
      params.price_range = pr;
    }
  }

  sql += ' ORDER BY rating DESC';

  res.json(db.prepare(sql).all(params) as Restaurant[]);
});

router.get('/:id', (req: Request, res: Response) => {
  const row = db
    .prepare('SELECT * FROM restaurants WHERE id = @id')
    .get({ id: req.params.id }) as Restaurant | undefined;

  if (!row) {
    res.status(404).json({ error: 'Restaurant not found' });
    return;
  }

  res.json(row);
});

router.get('/:id/menu', (req: Request, res: Response) => {
  const restaurant = db
    .prepare('SELECT id FROM restaurants WHERE id = @id')
    .get({ id: req.params.id });

  if (!restaurant) {
    res.status(404).json({ error: 'Restaurant not found' });
    return;
  }

  const items = db
    .prepare('SELECT * FROM menu_items WHERE restaurant_id = @id ORDER BY category, name')
    .all({ id: req.params.id }) as MenuItem[];

  const grouped: Record<string, MenuItem[]> = {};
  for (const item of items) {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  }

  res.json(grouped);
});

export default router;
