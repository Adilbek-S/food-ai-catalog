import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRestaurant, getMenu } from '@/lib/api';
import MenuSection from '@/components/MenuSection';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const r = await getRestaurant(id);
    return { title: r.name };
  } catch {
    return { title: 'Ресторан' };
  }
}

const CUISINE_LABEL: Record<string, string> = {
  kazakh:   'Казахская',
  italian:  'Итальянская',
  japanese: 'Японская',
  fastfood: 'Фастфуд',
  georgian: 'Грузинская',
};

const CUISINE_BADGE: Record<string, string> = {
  kazakh:   'bg-yellow-100 text-yellow-800',
  italian:  'bg-green-100 text-green-800',
  japanese: 'bg-red-100 text-red-800',
  fastfood: 'bg-orange-100 text-orange-800',
  georgian: 'bg-purple-100 text-purple-800',
};

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < full ? 'text-yellow-400' : 'text-gray-200'}>★</span>
      ))}
    </span>
  );
}

export default async function RestaurantDetailPage({ params }: PageProps) {
  const { id } = await params;

  let restaurant;
  let menu;
  try {
    [restaurant, menu] = await Promise.all([getRestaurant(id), getMenu(id)]);
  } catch {
    notFound();
  }

  const badgeClass = CUISINE_BADGE[restaurant.cuisine] ?? 'bg-gray-100 text-gray-700';
  const cuisineLabel = CUISINE_LABEL[restaurant.cuisine] ?? restaurant.cuisine;
  const priceSymbols = '₸'.repeat(restaurant.price_range);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-orange-500 hover:text-orange-600 hover:underline">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Назад к каталогу
      </Link>

      {/* Hero */}
      {restaurant.image_url && (
        <div className="relative h-72 w-full overflow-hidden rounded-2xl shadow-lg">
          <Image
            src={restaurant.image_url}
            alt={restaurant.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-5 left-5">
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${badgeClass}`}>{cuisineLabel}</span>
          </div>
        </div>
      )}

      {/* Info card */}
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">{restaurant.name}</h1>
            <p className="mt-1 text-gray-400 text-sm">{restaurant.city}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <Stars rating={restaurant.rating} />
              <span className="text-sm font-semibold text-gray-700 ml-1">{restaurant.rating.toFixed(1)}</span>
            </div>
            <p className="mt-1 text-lg font-bold text-slate-800">{priceSymbols}</p>
          </div>
        </div>

        {restaurant.description && (
          <p className="mt-4 text-gray-600 leading-relaxed">{restaurant.description}</p>
        )}

        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
          {restaurant.address && (
            <div className="flex items-start gap-2">
              <dt className="mt-0.5 text-gray-400">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </dt>
              <dd className="text-sm text-gray-700">{restaurant.address}</dd>
            </div>
          )}
          {restaurant.phone && (
            <div className="flex items-start gap-2">
              <dt className="mt-0.5 text-gray-400">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </dt>
              <dd className="text-sm text-gray-700">{restaurant.phone}</dd>
            </div>
          )}
        </dl>
      </div>

      {/* Menu */}
      <div>
        <h2 className="mb-5 text-2xl font-bold text-gray-900">Меню</h2>
        <MenuSection menu={menu} />
      </div>
    </div>
  );
}
