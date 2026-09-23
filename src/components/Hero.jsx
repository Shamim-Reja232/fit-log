import Link from "next/link";
import Image from "next/image";
import heroImage from "@/assets/banner.png";


export default function Hero() {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto grid min-h-[600px] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8">

        {/* Left Content */}
        <div>
          <p className="mb-5 text-sm font-bold tracking-[0.2em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          <h1 className="max-w-3xl text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link
            href="#library"
            className="mt-8 inline-flex items-center gap-3 bg-[#ccff00] px-6 py-4 text-sm font-black text-black transition hover:bg-white"
          >
            BROWSE WORKOUTS
            <span className="text-lg">→</span>
          </Link>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <div className="relative h-[320px] w-full max-w-[500px] overflow-hidden rounded-2xl sm:h-[400px]">
  <Image
    src={heroImage}
    alt="FitLog workout"
    fill
    className="object-cover"
    priority
  />
</div>
        </div>

      </div>
    </section>
  );
}