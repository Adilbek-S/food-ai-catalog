'use client';

const CUISINES: { label: string; value: string }[] = [
  { label: 'Все', value: '' },
  { label: 'Казахская', value: 'kazakh' },
  { label: 'Итальянская', value: 'italian' },
  { label: 'Японская', value: 'japanese' },
  { label: 'Фастфуд', value: 'fastfood' },
  { label: 'Грузинская', value: 'georgian' },
];

const PRICES: { label: string; value: number | null }[] = [
  { label: 'Любая', value: null },
  { label: '₸', value: 1 },
  { label: '₸₸', value: 2 },
  { label: '₸₸₸', value: 3 },
];

interface FilterBarProps {
  cuisine: string;
  priceRange: number | null;
  onCuisine: (v: string) => void;
  onPrice: (v: number | null) => void;
}

export default function FilterBar({ cuisine, priceRange, onCuisine, onPrice }: FilterBarProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {CUISINES.map((c) => (
          <button
            key={c.value}
            onClick={() => onCuisine(c.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              cuisine === c.value
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-white text-gray-600 shadow hover:bg-orange-50 hover:text-orange-600'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {PRICES.map((p) => (
          <button
            key={p.value ?? 'all'}
            onClick={() => onPrice(p.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              priceRange === p.value
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-gray-600 shadow hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
