import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-6xl font-bold text-orange-500">404</h1>
      <p className="text-xl text-gray-600">Page not found</p>
      <Link href="/" className="rounded-lg bg-orange-500 px-6 py-2 text-white hover:bg-orange-600">
        Go home
      </Link>
    </div>
  );
}
