import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <p className="text-sm font-bold tracking-[0.2em] text-gray-400">
          FITLOG
        </p>

        <h1 className="mt-3 text-7xl font-black">
          404
        </h1>

        <h2 className="mt-3 text-2xl font-black uppercase">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-500">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-7 inline-block rounded-full bg-black px-6 py-3 text-sm font-black uppercase text-white transition hover:bg-gray-800"
        >
          Back to Workouts
        </Link>
      </div>
    </main>
  );
}