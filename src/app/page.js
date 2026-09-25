import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";

async function getWorkouts() {
  const response = await fetch(
    "https://api.abcz.workers.dev/api/fitlog",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return response.json();
}

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <main>
      {/* Hero */}
      <Hero />

      {/* Workout Library */}
      <section
        id="library"
        className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8"
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

        {/* Workout Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </section>
    </main>
  );
}