import { Router, Request, Response } from 'express';
import db from '../db';
import type { CartItemWithDetails } from '../types/restaurant';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  const { menu_item_id, quantity } = req.body as { menu_item_id?: unknown; quantity?: unknown };

  if (!menu_item_id || typeof menu_item_id !== 'number') {
    res.status(400).json({ error: 'menu_item_id (number) is required' });
    return;
  }

  const qty = typeof quantity === 'number' && quantity > 0 ? Math.floor(quantity) : 1;

  const item = db.prepare('SELECT id FROM menu_items WHERE id = @id').get({ id: menu_item_id });
  if (!item) {
    res.status(404).json({ error: 'Menu item not found' });
    return;
  }

  const result = db
    .prepare('INSERT INTO cart (menu_item_id, quantity) VALUES (@menu_item_id, @quantity)')
    .run({ menu_item_id, quantity: qty });

  const created = db
    .prepare(`
      SELECT c.*, m.name AS item_name, m.description AS item_description,
             m.price AS item_price, m.category AS item_category,
             m.restaurant_id, r.name AS restaurant_name
      FROM cart c
      JOIN menu_items m ON m.id = c.menu_item_id
      JOIN restaurants r ON r.id = m.restaurant_id
      WHERE c.id = @id
    `)
    .get({ id: result.lastInsertRowid }) as CartItemWithDetails;

  res.status(201).json(created);
});

router.get('/', (_req: Request, res: Response) => {
  const items = db
    .prepare(`
      SELECT c.*, m.name AS item_name, m.description AS item_description,
             m.price AS item_price, m.category AS item_category,
             m.restaurant_id, r.name AS restaurant_name
      FROM cart c
      JOIN menu_items m ON m.id = c.menu_item_id
      JOIN restaurants r ON r.id = m.restaurant_id
      ORDER BY c.created_at DESC
    `)
    .all() as CartItemWithDetails[];

  res.json(items);
});

router.delete('/:id', (req: Request, res: Response) => {
  const result = db
    .prepare('DELETE FROM cart WHERE id = @id')
    .run({ id: req.params.id });

  if (result.changes === 0) {
    res.status(404).json({ error: 'Cart item not found' });
    return;
  }

  res.status(204).send();
});

export default router;
