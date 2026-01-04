import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Allogo",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-white dark:bg-neutral-950">
      {/* 404 Glitch/Pixel Effect */}
      <div className="relative mb-6">
        <h1 className="text-[120px] leading-none font-bold text-neutral-900 dark:text-white font-pixel select-none animate-pulse">
          404
        </h1>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none opacity-50 blur-xl bg-blue-500/20 rounded-full"></div>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 tracking-tight">
        Lost in the Vector Space?
      </h2>

      <p className="text-neutral-600 dark:text-neutral-400 max-w-md mb-10 text-lg leading-relaxed">
        The page you&apos;re looking for seems to have vanished. Maybe try searching for a different
        logo?
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 rounded-full hover:opacity-90 transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </Link>

        <Link
          href="https://github.com/callback-io/allogo/issues"
          target="_blank"
          className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all border border-transparent"
        >
          Report a Missing Logo
        </Link>
      </div>
    </div>
  );
}
