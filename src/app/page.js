import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />

      <section
        id="library"
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mb-10">
          <p className="mb-3 text-sm font-bold tracking-[0.2em] text-gray-500">
            WORKOUT LIBRARY
          </p>

          <h2 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
            THE LIBRARY
          </h2>

          <p className="mt-3 text-gray-500">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center">
          <p className="font-bold text-gray-400">
            Workouts will appear here
          </p>
        </div>
      </section>
    </main>
  );
}