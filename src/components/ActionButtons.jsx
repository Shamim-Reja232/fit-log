"use client";

import { useState } from "react";

export default function ActionButtons({ workout }) {
  const [isInPlan, setIsInPlan] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const handleAddToPlan = () => {
    const todayPlan = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    // Already added
    if (todayPlan.some((item) => item.id === workout.id)) {
      setIsInPlan(true);
      showToast("Already in today's plan");
      return;
    }

    // Maximum 5 workouts
    if (todayPlan.length >= 5) {
      showToast("Today's plan is full (5 workouts max)");
      return;
    }

    const updatedPlan = [...todayPlan, workout];

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );

    setIsInPlan(true);

    window.dispatchEvent(new Event("fitlog-updated"));

    showToast("Added to today's plan");
  };

  const handleSave = () => {
    const savedWorkouts = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    // Remove if already saved
    if (savedWorkouts.some((item) => item.id === workout.id)) {
      const updatedSaved = savedWorkouts.filter(
        (item) => item.id !== workout.id
      );

      localStorage.setItem(
        "fitlog-saved",
        JSON.stringify(updatedSaved)
      );

      setIsSaved(false);

      window.dispatchEvent(new Event("fitlog-updated"));

      showToast("Removed from saved");
      return;
    }

    // Save workout
    const updatedSaved = [...savedWorkouts, workout];

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved)
    );

    setIsSaved(true);

    window.dispatchEvent(new Event("fitlog-updated"));

    showToast("Saved for later");
  };

  return (
    <>
      {/* Buttons */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={handleAddToPlan}
          className={`rounded-full px-6 py-3 text-sm font-black uppercase transition ${
            isInPlan
              ? "cursor-not-allowed bg-[#ccff00] text-black"
              : "bg-black text-white hover:opacity-80"
          }`}
        >
          {isInPlan
            ? "✓ Already in today's plan"
            : "+ Add to today's plan"}
        </button>

        <button
          onClick={handleSave}
          className="rounded-full border border-black px-6 py-3 text-sm font-black uppercase transition hover:bg-black hover:text-white"
        >
          {isSaved ? "♥ Saved" : "♡ Save for later"}
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-black px-6 py-3 text-sm font-bold text-white shadow-lg">
          {toast}
        </div>
      )}
    </>
  );
}