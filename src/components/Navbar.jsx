"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo.png";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src={logo}
                        alt="FitLog Logo"
                        width={40}
                        height={40}
                        className="h-10 w-10 object-contain"
                    />

                    <span className="text-xl font-black tracking-tight">
                        FITLOG
                    </span>
                </Link>

                {/* Center Links */}
                <div className="hidden items-center gap-8 md:flex">
                    <Link
                        href="/"
                        className={`text-sm font-bold ${pathname === "/"
                                ? "border-b-2 border-black pb-1"
                                : "text-gray-500 hover:text-black"
                            }`}
                    >
                        WORKOUT
                    </Link>

                    <Link
                        href="/my-plan"
                        className={`text-sm font-bold ${pathname === "/my-plan"
                                ? "border-b-2 border-black pb-1"
                                : "text-gray-500 hover:text-black"
                            }`}
                    >
                        MY PLAN
                    </Link>
                </div>

                {/* Right Badges */}
                <div className="hidden items-center gap-3 sm:flex">
                    <Link
                        href="/my-plan"
                        className="rounded-full bg-[#ccff00] px-4 py-2 text-sm font-black text-black"
                    >
                        PLAN <span>0</span>
                    </Link>

                    <Link
                        href="/my-plan"
                        className="rounded-full border-2 border-black px-4 py-2 text-sm font-black text-black"
                    >
                        SAVED <span>0</span>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="rounded-lg border border-gray-300 p-2 md:hidden"
                    aria-label="Open menu"
                >
                    <span className="block h-0.5 w-5 bg-black"></span>
                    <span className="mt-1.5 block h-0.5 w-5 bg-black"></span>
                    <span className="mt-1.5 block h-0.5 w-5 bg-black"></span>
                </button>

            </div>
        </nav>
    );
}