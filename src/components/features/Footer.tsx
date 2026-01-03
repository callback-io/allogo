"use client";

import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500 dark:text-neutral-400">
          <div className="flex flex-col gap-1">
            <span>© {currentYear} Allogo.</span>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 max-w-xl">
              All product names, logos, and brands are property of their respective owners. All
              company, product and service names used in this website are for identification
              purposes only. Use of these names, logos, and brands does not imply endorsement.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/legal"
              className="text-xs font-medium hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
            >
              Legal & DMCA
            </Link>
            <Link
              href="https://github.com/callback-io/allogo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
            >
              GitHub
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700">|</span>
            <div className="flex items-center gap-4">
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
      </div>
    </footer>
  );
}
