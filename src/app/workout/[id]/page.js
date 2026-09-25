import Image from "next/image";
import Link from "next/link";
import ActionButtons from "@/components/ActionButtons";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export default async function WorkoutDetails({ params }) {
  const { id } = await params;

  const response = await fetch(`${API_URL}/${id}`, {
    cache: "no-store",
  });

  // Workout not found
  if (!response.ok) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="text-center">
          <h1 className="text-4xl font-black uppercase">
            Workout Not Found
          </h1>

          <p className="mt-4 text-gray-500">
            The workout you are looking for does not exist.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-full bg-black px-6 py-3 text-sm font-bold uppercase text-white"
          >
            Back to Workouts
          </Link>
        </div>
      </main>
    );
  }

  const workout = await response.json();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      {/* Back to Library */}
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase text-gray-500 transition hover:text-black"
      >
        ← Back to Library
      </Link>

      {/* Detail Layout */}
      <section className="grid gap-10 lg:grid-cols-2 lg:items-start">
        {/* =========================
            LEFT - WORKOUT IMAGE
        ========================== */}
        <div className="relative overflow-hidden rounded-3xl bg-gray-100">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* =========================
            RIGHT - WORKOUT DETAILS
        ========================== */}
        <div>
          {/* Muscle Group Tags */}
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups?.map((group) => (
              <span
                key={group}
                className="rounded-full bg-[#ccff00] px-4 py-2 text-xs font-black uppercase tracking-wide text-black"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Workout Name */}
          <h1 className="mt-5 text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">
            {workout.name}
          </h1>

          {/* Description */}
          <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
            {workout.description}
          </p>

          {/* =========================
              WORKOUT SPECS
          ========================== */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200">
            <div className="grid grid-cols-2">
              {/* Equipment */}
              <div className="border-b border-r border-gray-200 p-4 sm:p-5">
                <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400">
                  EQUIPMENT
                </p>

                <p className="mt-2 text-sm font-bold">
                  {workout.equipment}
                </p>
              </div>

              {/* Difficulty */}
              <div className="border-b border-gray-200 p-4 sm:p-5">
                <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400">
                  DIFFICULTY
                </p>

                <p className="mt-2 text-sm font-bold">
                  {workout.difficulty}
                </p>
              </div>

              {/* Sets */}
              <div className="border-b border-r border-gray-200 p-4 sm:p-5">
                <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400">
                  SETS
                </p>

                <p className="mt-2 text-sm font-bold">
                  {workout.sets}
                </p>
              </div>

              {/* Reps */}
              <div className="border-b border-gray-200 p-4 sm:p-5">
                <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400">
                  REPS
                </p>

                <p className="mt-2 text-sm font-bold">
                  {workout.reps}
                </p>
              </div>

              {/* Duration */}
              <div className="border-b border-r border-gray-200 p-4 sm:p-5">
                <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400">
                  DURATION
                </p>

                <p className="mt-2 text-sm font-bold">
                  {workout.duration} min
                </p>
              </div>

              {/* Calories */}
              <div className="border-b border-gray-200 p-4 sm:p-5">
                <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400">
                  CALORIES
                </p>

                <p className="mt-2 text-sm font-bold">
                  {workout.caloriesBurned} kcal
                </p>
              </div>

              {/* Rating */}
              <div className="col-span-2 p-4 sm:p-5">
                <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400">
                  RATING
                </p>

                <p className="mt-2 text-sm font-bold">
                  ⭐ {workout.rating}
                </p>
              </div>
            </div>
          </div>

          {/* =========================
              INSTRUCTIONS
          ========================== */}
          <div className="mt-8">
            <p className="text-xs font-bold tracking-[0.2em] text-gray-400">
              HOW TO PERFORM
            </p>

            <h2 className="mt-2 text-2xl font-black uppercase">
              Instructions
            </h2>

            <ol className="mt-5 space-y-3">
              {workout.instructions?.map((instruction, index) => (
                <li
                  key={index}
                  className="flex gap-4 rounded-2xl border border-gray-200 p-4"
                >
                  {/* Step Number */}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                    {index + 1}
                  </span>

                  {/* Instruction Text */}
                  <p className="pt-1 text-sm leading-6 text-gray-600">
                    {instruction}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* =========================
              ACTION BUTTONS
          ========================== */}
          <ActionButtons workout={workout} />
        </div>
      </section>
    </main>
  );
}