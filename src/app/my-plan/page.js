"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyPlan() {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

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

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const removeFromPlan = (id) => {
    const workout = plan.find((item) => item.id === id);

    const updatedPlan = plan.filter((item) => item.id !== id);

    localStorage.setItem("fitlog-plan", JSON.stringify(updatedPlan));

    setPlan(updatedPlan);

    showToast(
      `${workout?.name || "Workout"} removed from today's plan`
    );

    window.dispatchEvent(new Event("fitlog-updated"));
  };

  const removeFromSaved = (id) => {
    const workout = saved.find((item) => item.id === id);

    const updatedSaved = saved.filter(
      (item) => item.id !== id
    );

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved)
    );

    setSaved(updatedSaved);

    showToast(
      `${workout?.name || "Workout"} removed from saved`
    );

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

    showToast(`${workout.name} marked as done`);

    window.dispatchEvent(new Event("fitlog-updated"));
  };

  const currentList =
    activeTab === "plan" ? plan : saved;

  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration") {
      return Number(a.duration || 0) - Number(b.duration || 0);
    }

    if (sortBy === "calories") {
      return (
        Number(b.caloriesBurned || 0) -
        Number(a.caloriesBurned || 0)
      );
    }

    if (sortBy === "rating") {
      return Number(b.rating || 0) - Number(a.rating || 0);
    }

    return 0;
  });

  const totalMinutes = plan.reduce(
    (total, workout) =>
      total + Number(workout.duration || 0),
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

      {/* Tabs + Sort */}
      <section className="mx-auto mt-10 max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-1 border-b border-gray-200">

          {/* Tabs */}
          <div className="flex min-w-0 flex-1">

            <button
              onClick={() => setActiveTab("plan")}
              className={`whitespace-nowrap border-b-2 px-1.5 py-3 text-[10px] font-black uppercase sm:px-4 sm:text-sm ${
                activeTab === "plan"
                  ? "border-black text-black"
                  : "border-transparent text-gray-400"
              }`}
            >
              Today&apos;s Plan
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`whitespace-nowrap border-b-2 px-1.5 py-3 text-[10px] font-black uppercase sm:px-4 sm:text-sm ${
                activeTab === "saved"
                  ? "border-black text-black"
                  : "border-transparent text-gray-400"
              }`}
            >
              Saved
            </button>

          </div>

          {/* Sort */}
          <div className="mb-2 flex shrink-0 items-center gap-1">
            <span className="text-[9px] font-bold tracking-widest text-gray-400 sm:text-[10px]">
              SORT
            </span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-[70px] rounded-lg border border-gray-200 bg-white px-1 py-2 text-[10px] font-bold outline-none focus:border-black sm:w-auto sm:px-2 sm:text-xs"
              aria-label="Sort workouts"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>

        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {loading ? (
          <p className="py-20 text-center font-bold text-gray-400">
            Loading workouts...
          </p>
        ) : sortedList.length === 0 ? (

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

            {sortedList.map((workout) => (

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
                        onClick={() => {
                          if (activeTab === "plan") {
                            removeFromPlan(workout.id);
                          } else {
                            removeFromSaved(workout.id);
                          }
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-xl font-bold text-gray-400 transition hover:bg-black hover:text-white"
                        aria-label="Remove workout"
                      >
                        ×
                      </button>

                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                      {workout.equipment}
                    </p>

                    <div className="mt-4 flex gap-4 text-xs font-bold text-gray-500">

                      <span>
                        {workout.duration} min
                      </span>

                      <span>
                        {workout.caloriesBurned} kcal
                      </span>

                      <span>
                        ⭐ {workout.rating}
                      </span>

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

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 z-[9999] w-[90%] max-w-md -translate-x-1/2 rounded-xl bg-black px-6 py-4 text-center text-sm font-bold text-white shadow-2xl">
          {toast}
        </div>
      )}

    </main>
  );
}