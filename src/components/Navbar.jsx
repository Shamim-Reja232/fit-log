"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

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

    updateCounts();

    window.addEventListener("fitlog-updated", updateCounts);

    return () => {
      window.removeEventListener("fitlog-updated", updateCounts);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main Navbar */}
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
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

          {/* Desktop Center Links */}
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

          {/* Desktop Plan + Saved */}
          <div className="hidden items-center gap-2 md:flex">
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

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-2xl font-bold md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t border-gray-200 py-4 md:hidden">

            <div className="flex flex-col gap-2">

              {/* Workout */}
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-black uppercase transition hover:bg-gray-100"
              >
                Workout
              </Link>

              {/* My Plan */}
              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-black uppercase transition hover:bg-gray-100"
              >
                My Plan
              </Link>

              {/* Plan */}
              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between rounded-xl bg-[#ccff00] px-4 py-3 text-sm font-black uppercase text-black"
              >
                <span>Today&apos;s Plan</span>
                <span>{planCount}</span>
              </Link>

              {/* Saved */}
              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between rounded-xl border border-black px-4 py-3 text-sm font-black uppercase"
              >
                <span>Saved</span>
                <span>{savedCount}</span>
              </Link>

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
