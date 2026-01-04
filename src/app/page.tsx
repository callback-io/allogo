"use client";

import { useState, useMemo, useEffect, useCallback, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SearchInput } from "@/components/features/SearchInput";
import { LogoGrid } from "@/components/features/LogoGrid";
import { Toolbar, SortOrder, LogoSize } from "@/components/features/Toolbar";
import { searchLogos } from "@/lib/search";
import logosData from "@/data/logos.json";
import type { Logo } from "@/lib/types";

const logos = logosData as Logo[];

// Main content component that uses searchParams
function HomeContent() {
  const searchParams = useSearchParams();

  // Get initial query from URL
  const urlQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(urlQuery);
  const [sortOrder, setSortOrder] = useState<SortOrder>("name-asc");
  const [logoSize, setLogoSize] = useState<LogoSize>("medium");

  // Simple and reliable approach: sync with sessionStorage
  // This works regardless of how Next.js handles history

  // Handle search input change
  const handleSearch = useCallback((newQuery: string) => {
    setQuery(newQuery);

    // Build new URL
    const newUrl = newQuery ? `/?q=${encodeURIComponent(newQuery)}` : "/";

    // Update URL using native API (synchronous)
    window.history.replaceState(null, "", newUrl);

    // Store in sessionStorage for persistence across navigation
    if (newQuery) {
      sessionStorage.setItem("allogo_search", newQuery);
    } else {
      sessionStorage.removeItem("allogo_search");
    }
  }, []);

  // Restore search from sessionStorage on mount (handles back navigation)
  useEffect(() => {
    const urlQuery = searchParams.get("q");

    if (urlQuery) {
      // URL has query param, use it and sync to sessionStorage
      setQuery(urlQuery);
      sessionStorage.setItem("allogo_search", urlQuery);
    } else {
      // No URL param, try to restore from sessionStorage
      const savedQuery = sessionStorage.getItem("allogo_search");
      if (savedQuery) {
        setQuery(savedQuery);
        // Update URL to match
        window.history.replaceState(null, "", `/?q=${encodeURIComponent(savedQuery)}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Listen for popstate (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q") || "";
      setQuery(q);
      if (q) {
        sessionStorage.setItem("allogo_search", q);
      } else {
        sessionStorage.removeItem("allogo_search");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const filteredLogos = useMemo(() => {
    let result = searchLogos(query, logos);

    if (sortOrder === "name-asc") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "name-desc") {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [query, sortOrder]);

  // Track scroll position to show/hide sticky search
  const [showStickySearch, setShowStickySearch] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        // Show sticky search when hero section is scrolled past the top
        setShowStickySearch(heroBottom < 100);
      }
    };

    // Get the scrollable container
    const scrollContainer = document.getElementById("main-content");
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Search Bar - compact, appears when scrolling past hero */}
      <div
        className={`fixed top-14 left-0 right-0 z-40 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-sm transition-all duration-300 ${
          showStickySearch
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center">
          <div className="relative w-full max-w-md">
            {/* Search Icon */}
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={`Search ${logos.length} logos...`}
              className="w-full h-9 pl-9 pr-8 text-sm bg-neutral-100 dark:bg-neutral-800 rounded-lg border-0 focus:ring-0 focus:outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-neutral-900 dark:text-neutral-100"
            />
            {/* Clear Button */}
            {query && (
              <button
                onClick={() => handleSearch("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <section ref={heroRef} className="relative py-8 md:py-16 px-4 overflow-visible">
          {/* Background Decoration */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl" />
          </div>

          <div className="max-w-6xl mx-auto text-center">
            {/* Logo - smaller on mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4 md:mb-6"
            >
              <h1 className="font-pixel text-4xl md:text-7xl bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent leading-tight pb-2">
                Allogo
              </h1>
            </motion.div>

            {/* Tagline - hide on mobile when searching */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`text-base md:text-xl text-neutral-500 dark:text-neutral-400 mb-6 md:mb-10 max-w-2xl mx-auto ${
                query ? "hidden md:block" : ""
              }`}
            >
              SVG logos for developers.{" "}
              <span className="text-neutral-700 dark:text-neutral-200">Copy. Paste. Ship.</span>
            </motion.p>

            {/* Search Input */}
            <SearchInput
              onSearch={handleSearch}
              initialValue={query}
              placeholder={`Search ${logos.length} logos...`}
            />

            {/* Stats - hide on mobile when searching */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`mt-4 md:mt-6 flex items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-neutral-500 ${
                query ? "hidden md:flex" : ""
              }`}
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
                <span>React, Vue, Angular, Svelte</span>
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
        <section className="px-4 pt-4 pb-16">
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

// Default export with Suspense boundary for useSearchParams
export default function HomePage() {
  return (
    <Suspense
      fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}
    >
      <HomeContent />
    </Suspense>
  );
}
