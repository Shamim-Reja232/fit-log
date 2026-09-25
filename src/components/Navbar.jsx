"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      const plan = JSON.parse(
        localStorage.getItem("fitlog-plan") || "[]"
      );

      const saved = JSON.parse(
        localStorage.getItem("fitlog-saved") || "[]"
      );

      setPlanCount(plan.length);
      setSavedCount(saved.length);
    };

    // Load counts when Navbar starts
    updateCounts();

    // Update counts when plan/saved changes
    window.addEventListener("fitlog-updated", updateCounts);

    return () => {
      window.removeEventListener(
        "fitlog-updated",
        updateCounts
      );
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <Image
            src="/assets/logo.png"
            alt="FitLog logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />

          <span className="text-lg font-black">
            FITLOG
          </span>
        </Link>

        {/* Center Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-bold uppercase transition hover:text-gray-500"
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className="text-sm font-bold uppercase transition hover:text-gray-500"
          >
            My Plan
          </Link>
        </div>

        {/* Plan + Saved */}
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-[#ccff00] px-4 py-2 text-xs font-black uppercase text-black transition hover:opacity-80"
          >
            PLAN {planCount}
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-black px-4 py-2 text-xs font-black uppercase text-black transition hover:bg-black hover:text-white"
          >
            SAVED {savedCount}
          </Link>
        </div>
      </div>
    </nav>
  );
}