"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyPlan() {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [activeTab, setActiveTab] = useState("plan");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      const todayPlan = JSON.parse(
        localStorage.getItem("fitlog-plan") || "[]"
      );

      const savedWorkouts = JSON.parse(
        localStorage.getItem("fitlog-saved") || "[]"
      );

      setPlan(todayPlan);
      setSaved(savedWorkouts);
      setLoading(false);
    };

    loadData();

    window.addEventListener("fitlog-updated", loadData);

    return () => {
      window.removeEventListener("fitlog-updated", loadData);
    };
  }, []);

  const removeFromPlan = (id) => {
    const updatedPlan = plan.filter((workout) => workout.id !== id);

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );

    setPlan(updatedPlan);

    window.dispatchEvent(new Event("fitlog-updated"));
  };

  const removeFromSaved = (id) => {
    const updatedSaved = saved.filter(
      (workout) => workout.id !== id
    );

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved)
    );

    setSaved(updatedSaved);

    window.dispatchEvent(new Event("fitlog-updated"));
  };

  const markAsDone = (workout) => {
    const updatedPlan = plan.filter(
      (item) => item.id !== workout.id
    );

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );

    setPlan(updatedPlan);

    window.dispatchEvent(new Event("fitlog-updated"));

    alert(`${workout.name} marked as done!`);
  };

  const currentList = activeTab === "plan" ? plan : saved;

  const totalMinutes = plan.reduce(
    (total, workout) => total + Number(workout.duration || 0),
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) =>
      total + Number(workout.caloriesBurned || 0),
    0
  );

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 lg:px-8">
        <p className="text-sm font-bold tracking-[0.2em] text-gray-400">
          FITLOG
        </p>

        <h1 className="mt-3 text-5xl font-black uppercase tracking-tight sm:text-6xl">
          MY PLAN
        </h1>

        <p className="mt-4 max-w-xl text-gray-500">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </section>

      {/* Metrics */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-gray-200 p-5">
            <p className="text-xs font-bold tracking-widest text-gray-400">
              EXERCISES
            </p>

            <p className="mt-2 text-3xl font-black">
              {plan.length}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-5">
            <p className="text-xs font-bold tracking-widest text-gray-400">
              MINUTES
            </p>

            <p className="mt-2 text-3xl font-black">
              {totalMinutes}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-5">
            <p className="text-xs font-bold tracking-widest text-gray-400">
              CALORIES
            </p>

            <p className="mt-2 text-3xl font-black">
              {totalCalories}
            </p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-3 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("plan")}
            className={`border-b-2 px-4 py-3 text-sm font-black uppercase ${
              activeTab === "plan"
                ? "border-black text-black"
                : "border-transparent text-gray-400"
            }`}
          >
            Today&apos;s Plan
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`border-b-2 px-4 py-3 text-sm font-black uppercase ${
              activeTab === "saved"
                ? "border-black text-black"
                : "border-transparent text-gray-400"
            }`}
          >
            Saved
          </button>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {loading ? (
          <p className="py-20 text-center font-bold text-gray-400">
            Loading workouts...
          </p>
        ) : currentList.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 px-6 py-20 text-center">
            <h2 className="text-3xl font-black uppercase">
              NOTHING HERE YET
            </h2>

            <p className="mt-3 text-gray-500">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/#library"
              className="mt-6 inline-block rounded-full bg-black px-6 py-3 text-sm font-black uppercase text-white"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {currentList.map((workout) => (
              <article
                key={workout.id}
                className="overflow-hidden rounded-3xl border border-gray-200"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="h-56 sm:h-auto sm:w-48">
                    <img
                      src={workout.image}
                      alt={workout.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-xl font-black uppercase">
                        {workout.name}
                      </h2>

                      <button
                        onClick={() =>
                          activeTab === "plan"
                            ? removeFromPlan(workout.id)
                            : removeFromSaved(workout.id)
                        }
                        className="text-lg font-bold text-gray-400 hover:text-black"
                        aria-label="Remove workout"
                      >
                        ×
                      </button>
                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                      {workout.equipment}
                    </p>

                    <div className="mt-4 flex gap-4 text-xs font-bold text-gray-500">
                      <span>{workout.duration} min</span>
                      <span>
                        {workout.caloriesBurned} kcal
                      </span>
                      <span>⭐ {workout.rating}</span>
                    </div>

                    <div className="mt-auto flex flex-wrap gap-2 pt-5">
                      <Link
                        href={`/workout/${workout.id}`}
                        className="rounded-full border border-black px-4 py-2 text-xs font-black uppercase"
                      >
                        View Details
                      </Link>

                      {activeTab === "plan" && (
                        <button
                          onClick={() => markAsDone(workout)}
                          className="rounded-full bg-[#ccff00] px-4 py-2 text-xs font-black uppercase"
                        >
                          Mark as Done
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}