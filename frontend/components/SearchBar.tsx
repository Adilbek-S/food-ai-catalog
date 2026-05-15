'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useCallback, useTransition } from 'react';

interface SearchBarProps {
  cuisines: string[];
  defaultSearch?: string;
  defaultCuisine?: string;
}

export default function SearchBar({ cuisines, defaultSearch = '', defaultCuisine = '' }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const update = useCallback(
    (search: string, cuisine: string) => {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (cuisine) params.set('cuisine', cuisine);
      const qs = params.toString();
      startTransition(() => {
        router.push(`${pathname}${qs ? `?${qs}` : ''}`);
      });
    },
    [pathname, router]
  );

  return (
    <div className={`flex flex-wrap gap-3 transition-opacity ${isPending ? 'opacity-60' : ''}`}>
      <input
        type="search"
        placeholder="Search restaurants…"
        defaultValue={defaultSearch}
        onChange={(e) => update(e.target.value, defaultCuisine)}
        className="flex-1 min-w-48 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm shadow-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
      />
      <select
        defaultValue={defaultCuisine}
        onChange={(e) => update(defaultSearch, e.target.value)}
        className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm shadow-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
      >
        <option value="">All cuisines</option>
        {cuisines.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
