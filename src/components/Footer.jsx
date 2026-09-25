export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-black text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="text-xl font-black tracking-tight">
            FITLOG
          </p>

          <p className="mt-1 text-sm text-gray-400">
            Workout Library
          </p>
        </div>

        <p className="text-sm text-gray-400">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}