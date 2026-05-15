'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getCart, addToCart, removeFromCart } from './api';
import type { CartItemWithDetails } from './types';

interface CartContextValue {
  items: CartItemWithDetails[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  isLoading: boolean;
  toggleCart: () => void;
  addItem: (menuItemId: number, quantity?: number) => Promise<void>;
  removeItem: (cartId: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItemWithDetails[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await getCart();
      setItems(data);
    } catch {
      // silently ignore network errors
    }
  }, []);

  useEffect(() => {
    refresh().finally(() => setIsLoading(false));
  }, [refresh]);

  const addItem = useCallback(async (menuItemId: number, quantity = 1) => {
    await addToCart(menuItemId, quantity);
    await refresh();
    setIsOpen(true);
  }, [refresh]);

  const removeItem = useCallback(async (cartId: number) => {
    await removeFromCart(cartId);
    setItems((prev) => prev.filter((i) => i.id !== cartId));
  }, []);

  const clearCart = useCallback(async () => {
    await Promise.all(items.map((i) => removeFromCart(i.id)));
    setItems([]);
  }, [items]);

  const toggleCart = useCallback(() => setIsOpen((o) => !o), []);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.item_price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, totalItems, totalPrice, isOpen, isLoading, toggleCart, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
