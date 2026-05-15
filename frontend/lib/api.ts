import type { Restaurant, MenuItem, CartItemWithDetails, MenuByCategory, RestaurantFilters } from './types';

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, init);
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`API ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

export function getRestaurants(filters: RestaurantFilters = {}): Promise<Restaurant[]> {
  const p = new URLSearchParams();
  if (filters.cuisine) p.set('cuisine', filters.cuisine);
  if (filters.city) p.set('city', filters.city);
  if (filters.price_range) p.set('price_range', String(filters.price_range));
  const qs = p.toString();
  return apiFetch<Restaurant[]>(`/restaurants${qs ? `?${qs}` : ''}`);
}

export function getRestaurant(id: number | string): Promise<Restaurant> {
  return apiFetch<Restaurant>(`/restaurants/${id}`);
}

export function getMenu(id: number | string): Promise<MenuByCategory> {
  return apiFetch<MenuByCategory>(`/restaurants/${id}/menu`);
}

export function getCart(): Promise<CartItemWithDetails[]> {
  return apiFetch<CartItemWithDetails[]>('/cart');
}

export function addToCart(menu_item_id: number, quantity = 1): Promise<CartItemWithDetails> {
  return apiFetch<CartItemWithDetails>('/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ menu_item_id, quantity }),
  });
}

export function removeFromCart(id: number): Promise<void> {
  return apiFetch<void>(`/cart/${id}`, { method: 'DELETE' });
}
