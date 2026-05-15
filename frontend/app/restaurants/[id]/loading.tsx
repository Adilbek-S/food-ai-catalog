export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
      <div className="h-72 animate-pulse rounded-2xl bg-gray-200" />
      <div className="h-10 w-64 animate-pulse rounded bg-gray-200" />
      <div className="h-32 animate-pulse rounded-xl bg-gray-200" />
      <div className="h-24 animate-pulse rounded-xl bg-gray-200" />
    </div>
  );
}
