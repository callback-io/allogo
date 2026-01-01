"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SearchInput } from "@/components/features/SearchInput";
import { LogoGrid } from "@/components/features/LogoGrid";
import { Toolbar, SortOrder, LogoSize } from "@/components/features/Toolbar";
import { searchLogos } from "@/lib/search";
import logosData from "@/data/logos.json";
import type { Logo } from "@/lib/types";

const logos = logosData as Logo[];

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("name-asc");
  const [logoSize, setLogoSize] = useState<LogoSize>("medium");

  const filteredLogos = useMemo(() => {
    let result = searchLogos(query, logos);

    if (sortOrder === "name-asc") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "name-desc") {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [query, sortOrder]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 px-4 overflow-visible">
          {/* Background Decoration */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl" />
          </div>

          <div className="max-w-6xl mx-auto text-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h1 className="font-pixel text-5xl md:text-7xl bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent leading-tight pb-2">
                Allogo
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 mb-10 max-w-2xl mx-auto"
            >
              SVG logos for developers.{" "}
              <span className="text-neutral-700 dark:text-neutral-200">Copy. Paste. Ship.</span>
            </motion.p>

            {/* Search Input */}
            <SearchInput onSearch={setQuery} placeholder={`Search ${logos.length} logos...`} />

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 flex items-center justify-center gap-6 text-sm text-neutral-500"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{logos.length} logos</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                <span>React &amp; Vue</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Free</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Logo Grid Section */}
        <section className="px-4 pb-16">
          <div className="max-w-7xl mx-auto">
            {/* Toolbar */}
            <Toolbar
              sortOrder={sortOrder}
              onSortChange={setSortOrder}
              logoSize={logoSize}
              onSizeChange={setLogoSize}
              totalCount={filteredLogos.length}
            />

            {/* Logo Grid */}
            <LogoGrid logos={filteredLogos} logoSize={logoSize} />
          </div>
        </section>
      </main>

      {/* Footer - Sticky at bottom, no divider */}
      <footer className="py-6 px-4 mt-auto">
        <div className="max-w-6xl mx-auto text-center text-xs text-neutral-400 dark:text-neutral-500">
          <p>All logos are trademarks™ or registered® trademarks of their respective holders.</p>
          <p className="mt-1">
            Made with ❤️ for developers.{" "}
            <a
              href="https://github.com/callback-io/allogo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
            >
              Open Source
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
