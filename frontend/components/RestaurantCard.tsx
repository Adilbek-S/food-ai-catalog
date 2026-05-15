import Image from 'next/image';
import Link from 'next/link';
import type { Restaurant } from '@/lib/types';

const CUISINE_BADGE: Record<string, string> = {
  kazakh:   'bg-yellow-100 text-yellow-800',
  italian:  'bg-green-100 text-green-800',
  japanese: 'bg-red-100 text-red-800',
  fastfood: 'bg-orange-100 text-orange-800',
  georgian: 'bg-purple-100 text-purple-800',
};

const CUISINE_LABEL: Record<string, string> = {
  kazakh:   'Казахская',
  italian:  'Итальянская',
  japanese: 'Японская',
  fastfood: 'Фастфуд',
  georgian: 'Грузинская',
};

function PriceRange({ value }: { value: number }) {
  return (
    <span className="text-sm font-semibold">
      <span className="text-slate-800">{'₸'.repeat(value)}</span>
      <span className="text-slate-300">{'₸'.repeat(3 - value)}</span>
    </span>
  );
}

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span className="text-sm">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < full ? 'text-yellow-400' : 'text-gray-200'}>★</span>
      ))}
    </span>
  );
}

export default function RestaurantCard({ restaurant: r }: { restaurant: Restaurant }) {
  const badgeClass = CUISINE_BADGE[r.cuisine] ?? 'bg-gray-100 text-gray-700';
  const cuisineLabel = CUISINE_LABEL[r.cuisine] ?? r.cuisine;

  return (
    <Link
      href={`/restaurants/${r.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl"
    >
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        {r.image_url ? (
          <Image
            src={r.image_url}
            alt={r.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl text-slate-300">🍽</div>
        )}
        <span className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeClass}`}>
          {cuisineLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-snug line-clamp-1 text-gray-900">{r.name}</h3>
          <PriceRange value={r.price_range} />
        </div>

        <p className="text-xs text-gray-400 line-clamp-1">{r.city} · {r.address}</p>

        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{r.description}</p>

        <div className="mt-auto flex items-center justify-between pt-1">
          <Stars rating={r.rating} />
          <span className="text-xs font-medium text-gray-500">{r.rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}
