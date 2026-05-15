'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { getRestaurants } from '@/lib/api';
import type { RestaurantFilters } from '@/lib/types';
import FilterBar from '@/components/FilterBar';
import RestaurantCard from '@/components/RestaurantCard';
import { SkeletonGrid } from '@/components/SkeletonCard';

function fetcher(_key: string, filters: RestaurantFilters) {
  return getRestaurants(filters);
}

export default function HomePage() {
  const [cuisine, setCuisine] = useState('');
  const [priceRange, setPriceRange] = useState<number | null>(null);

  const filters: RestaurantFilters = {
    ...(cuisine ? { cuisine } : {}),
    ...(priceRange ? { price_range: priceRange } : {}),
  };

  const swrKey = ['restaurants', cuisine, priceRange] as const;
  const { data: restaurants, isLoading, error } = useSWR(swrKey, ([, , ]) => getRestaurants(filters));

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 px-8 py-14 text-center text-white shadow-xl">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Найдите свой ресторан
        </h1>
        <p className="mt-3 text-lg text-slate-300">
          Лучшие рестораны города — в одном месте
        </p>
      </section>

      {/* Filters */}
      <FilterBar
        cuisine={cuisine}
        priceRange={priceRange}
        onCuisine={setCuisine}
        onPrice={setPriceRange}
      />

      {/* Results count */}
      {!isLoading && restaurants && (
        <p className="text-sm text-gray-400">
          {restaurants.length === 0
            ? 'Ничего не найдено'
            : `${restaurants.length} ${restaurants.length === 1 ? 'ресторан' : restaurants.length < 5 ? 'ресторана' : 'ресторанов'}`}
        </p>
      )}

      {/* Grid */}
      {error ? (
        <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-center text-sm text-red-500">
          Не удалось загрузить рестораны. Убедитесь, что сервер запущен на порту 3001.
        </div>
      ) : isLoading ? (
        <SkeletonGrid count={6} />
      ) : restaurants && restaurants.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-200 py-20 text-center text-slate-400">
          <p className="text-4xl">🔍</p>
          <p className="mt-2 text-sm">По выбранным фильтрам ничего не найдено</p>
        </div>
      )}
    </div>
  );
}
