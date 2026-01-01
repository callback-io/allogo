"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeTabs } from "@/components/features/CodeTabs";
import {
  generateReactComponent,
  generateVueComponent,
  generateAngularComponent,
  generateSvelteComponent,
  generateHtmlCode,
} from "@/lib/codeGenerator";
import type { LogoWithSvg } from "@/lib/types";

interface LogoDetailClientProps {
  logo: LogoWithSvg;
}

export function LogoDetailClient({ logo }: LogoDetailClientProps) {
  const { resolvedTheme } = useTheme();
  // Internal background state: null follows system, otherwise manual
  const [manualBgMode, setManualBgMode] = useState<"dark" | "light" | null>(null);

  // Ensure theme is displayed only after mounting to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Calculate current display mode
  const currentBgMode = manualBgMode ?? (resolvedTheme === "light" ? "light" : "dark");
  const displayMode = mounted ? currentBgMode : "dark";

  // Get current origin (client-side)
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  const reactCode = generateReactComponent(logo.name, logo.svgContent);
  const vueCode = generateVueComponent(logo.name, logo.svgContent);
  const angularCode = generateAngularComponent(logo.name, logo.svgContent);
  const svelteCode = generateSvelteComponent(logo.name, logo.svgContent);
  const htmlCode = generateHtmlCode(logo.slug, baseUrl);

  const handleDownload = () => {
    const blob = new Blob([logo.svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${logo.slug}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen pb-12">
      {/* Back Link */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Back to all logos</span>
        </Link>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Top: Logo Info + Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row gap-6 md:items-start mb-8"
        >
          {/* Logo Preview */}
          <div
            className={`w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden transition-colors duration-200 ${
              displayMode === "dark"
                ? "bg-neutral-900 shadow-black/30"
                : "bg-white shadow-neutral-300/50"
            }`}
          >
            <div
              className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center [&>svg]:w-auto [&>svg]:h-auto [&>svg]:max-w-full [&>svg]:max-h-full"
              dangerouslySetInnerHTML={{ __html: logo.svgContent }}
            />
          </div>

          {/* Logo Info + Actions */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
              {logo.name}
            </h1>
            {logo.category && (
              <p className="text-neutral-500 dark:text-neutral-400 mb-4">{logo.category}</p>
            )}

            {/* Background Toggle + Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Background Toggle */}
              <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                {(["dark", "light"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setManualBgMode(mode)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                      displayMode === mode
                        ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm"
                        : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                    }`}
                  >
                    {mode === "dark" ? "Dark" : "Light"}
                  </button>
                ))}
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download SVG
              </button>

              {/* Website Link */}
              {logo.website && (
                <a
                  href={logo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Website
                </a>
              )}
            </div>

            {/* Tags */}
            {logo.tags && logo.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {logo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Code Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <CodeTabs
            defaultTab="React"
            tabs={[
              { label: "React", code: reactCode, language: "tsx", filename: "Icon.tsx" },
              { label: "Vue", code: vueCode, language: "vue", filename: "Icon.vue" },
              {
                label: "Angular",
                code: angularCode,
                language: "typescript",
                filename: "icon.component.ts",
              },
              { label: "Svelte", code: svelteCode, language: "svelte", filename: "Icon.svelte" },
              { label: "SVG", code: logo.svgContent, language: "html", filename: "icon.svg" },
              { label: "HTML", code: htmlCode, language: "html", filename: "usage.html" },
            ]}
          />
        </motion.div>
      </div>
    </main>
  );
}
