"use client";

import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-6xl mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 text-xs md:text-sm text-neutral-500 dark:text-neutral-400">
          {/* Left side - copyright and disclaimer */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span>© {currentYear} Allogo</span>
            {/* Disclaimer - hide on mobile */}
            <p className="hidden md:block text-xs text-neutral-400 dark:text-neutral-500 max-w-xl">
              All product names, logos, and brands are property of their respective owners.
            </p>
          </div>

          {/* Right side - links - compact on mobile */}
          <div className="flex items-center gap-3 md:gap-4 flex-wrap justify-center">
            <Link
              href="/legal"
              className="hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
            >
              Legal
            </Link>
            <Link
              href="https://github.com/callback-io/allogo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
            >
              GitHub
            </Link>
            <Link
              href="/privacy"
              className="hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/contact"
              className="hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
