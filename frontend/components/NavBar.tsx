'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';

export default function NavBar() {
  const { totalItems, toggleCart } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-slate-900 shadow-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-white hover:text-orange-400 transition-colors">
          <span className="text-orange-400">🍽</span>
          FoodFinder
        </Link>

        <button
          onClick={toggleCart}
          aria-label="Открыть корзину"
          className="relative flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 active:scale-95"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 19a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm8 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>
          <span>Корзина</span>
          {totalItems > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1.5 text-xs font-bold text-white">
              {totalItems}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}
