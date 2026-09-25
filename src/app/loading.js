export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>

        <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
          Loading workouts...
        </p>
      </div>
    </div>
  );
}