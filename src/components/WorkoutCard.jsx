import Image from "next/image";
import Link from "next/link";

export default function WorkoutCard({ workout }) {
  const equipment = Array.isArray(workout.equipment)
    ? workout.equipment.join(", ")
    : workout.equipment;

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden bg-gray-100">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Categories */}
        <div className="mb-3 flex flex-wrap gap-2">
          {Array.isArray(workout.muscleGroups) &&
            workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-black px-3 py-1 text-xs font-bold uppercase text-[#ccff00]"
              >
                {muscle}
              </span>
            ))}
        </div>

        {/* Workout Name */}
        <h3 className="text-xl font-black uppercase leading-tight">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-2 text-sm text-gray-500">
          {equipment}
        </p>

        {/* Stats */}
        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-sm font-semibold text-gray-600">
          <span>⏱ {workout.duration} min</span>
          <span>🔥 {workout.caloriesBurned} kcal</span>
          <span>★ {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}