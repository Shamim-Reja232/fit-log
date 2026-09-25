import Image from "next/image";
import Link from "next/link";
import banner from "@/assets/banner.png";

export default function Hero() {
  return (
    <section className="bg-black px-6 py-16 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">

        {/* Left */}
        <div>
          <p className="mb-4 text-sm font-bold tracking-[0.2em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          <h1 className="max-w-3xl text-5xl font-black uppercase leading-[0.95] md:text-7xl">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>

          <p className="mt-6 max-w-xl text-gray-400">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link
            href="#library"
            className="mt-8 inline-flex items-center gap-3 bg-[#ccff00] px-6 py-4 font-black text-black transition hover:bg-white"
          >
            BROWSE WORKOUTS
            <span>→</span>
          </Link>
        </div>

        {/* Right - Banner */}
        <div className="relative h-[350px] w-full overflow-hidden rounded-2xl md:h-[450px]">
          <Image
            src={banner}
            alt="FitLog workout"
            fill
            priority
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
}