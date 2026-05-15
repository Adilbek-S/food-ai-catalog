'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import type { MenuByCategory } from '@/lib/types';

export default function MenuSection({ menu }: { menu: MenuByCategory }) {
  const { addItem } = useCart();
  const [adding, setAdding] = useState<number | null>(null);
  const categories = Object.keys(menu);

  const handleAdd = async (itemId: number) => {
    setAdding(itemId);
    try {
      await addItem(itemId, 1);
    } finally {
      setAdding(null);
    }
  };

  if (categories.length === 0) {
    return <p className="text-sm text-gray-400">Меню не добавлено.</p>;
  }

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <section key={category}>
          <h3 className="mb-4 text-lg font-bold text-gray-800 border-b border-slate-100 pb-2">{category}</h3>
          <ul className="space-y-3">
            {menu[category].map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-sm"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  {item.description && (
                    <p className="mt-0.5 text-xs text-gray-400 line-clamp-2">{item.description}</p>
                  )}
                  <p className="mt-1 text-sm font-bold text-orange-600">
                    {item.price.toLocaleString('ru-RU')} ₸
                  </p>
                </div>
                <button
                  onClick={() => handleAdd(item.id)}
                  disabled={adding === item.id}
                  className="shrink-0 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600 active:scale-95 disabled:opacity-60"
                >
                  {adding === item.id ? '…' : '+ Добавить'}
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
