"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { CodeTabs } from "@/components/features/CodeTabs";
import {
  generateReactComponent,
  generateVueComponent,
  generateAngularComponent,
  generateSvelteComponent,
} from "@/lib/codeGenerator";
import type { LogoWithSvg } from "@/lib/types";

interface LogoDetailClientProps {
  logo: LogoWithSvg;
}

export function LogoDetailClient({ logo }: LogoDetailClientProps) {
  const { resolvedTheme } = useTheme();
  const [manualBgMode, setManualBgMode] = useState<"dark" | "light" | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const currentBgMode = manualBgMode ?? (resolvedTheme === "light" ? "light" : "dark");
  const displayMode = mounted ? currentBgMode : "dark";

  // CDN URL construction
  // Production usage: Use specific version tag instead of @main explicitly if needed
  const cdnUrl = `https://cdn.jsdelivr.net/gh/callback-io/allogo@main/public/logos/${
    logo.slug
  }/icon.${logo.fileType || "svg"}`;

  // Only generate code if we have SVG content
  const reactCode = logo.svgContent ? generateReactComponent(logo.name, logo.svgContent) : "";
  const vueCode = logo.svgContent ? generateVueComponent(logo.name, logo.svgContent) : "";
  const angularCode = logo.svgContent ? generateAngularComponent(logo.name, logo.svgContent) : "";
  const svelteCode = logo.svgContent ? generateSvelteComponent(logo.name, logo.svgContent) : "";

  // Tabs configuration
  const tabs = [];

  // CDN Tab (Always first or present)
  tabs.push({
    label: "CDN Link",
    code: cdnUrl,
    language: "bash",
    filename: "cdn-url.txt",
  });

  if (logo.svgContent) {
    tabs.push(
      { label: "React", code: reactCode, language: "tsx", filename: "Icon.tsx" },
      { label: "Vue", code: vueCode, language: "vue", filename: "Icon.vue" },
      {
        label: "Angular",
        code: angularCode,
        language: "typescript",
        filename: "icon.component.ts",
      },
      { label: "Svelte", code: svelteCode, language: "svelte", filename: "Icon.svelte" },
      { label: "SVG", code: logo.svgContent, language: "html", filename: "icon.svg" }
    );
  }

  const handleDownload = () => {
    if (logo.svgContent) {
      // SVG Download
      const blob = new Blob([logo.svgContent], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${logo.slug}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // Raster Download (Direct Link)
      const a = document.createElement("a");
      a.href = `/logos/${logo.slug}/icon.${logo.fileType || "png"}`;
      a.download = `${logo.slug}.${logo.fileType || "png"}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
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
          className="flex flex-col items-center md:flex-row md:items-start gap-6 mb-8"
        >
          {/* Logo Preview */}
          <div
            className={`w-40 h-40 md:w-48 md:h-48 flex-shrink-0 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden transition-colors duration-200 ${
              displayMode === "dark"
                ? "bg-neutral-900 shadow-black/30"
                : "bg-white shadow-neutral-300/50"
            }`}
          >
            <div className="w-28 h-28 md:w-32 md:h-32 flex items-center justify-center p-2">
              {logo.svgContent ? (
                <div
                  className="w-full h-full flex items-center justify-center [&>svg]:w-auto [&>svg]:h-auto [&>svg]:max-w-full [&>svg]:max-h-full"
                  dangerouslySetInnerHTML={{ __html: logo.svgContent }}
                />
              ) : (
                /* Raster Image Preview */
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`/logos/${logo.slug}/icon.${logo.fileType || "png"}`}
                  alt={logo.name}
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>
          </div>

          {/* Logo Info + Actions */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
              {logo.name}
            </h1>
            {logo.category && (
              <p className="text-neutral-500 dark:text-neutral-400 mb-4">{logo.category}</p>
            )}

            {/* Background Toggle + Action Buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-3">
              {/* Background Toggle */}
              <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                {(["dark", "light"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setManualBgMode(mode)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
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
                className="inline-flex items-center gap-2 px-3 md:px-4 py-2 text-sm font-medium rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download{" "}
                {logo.fileType && logo.fileType !== "svg" ? logo.fileType.toUpperCase() : "SVG"}
              </button>

              {logo.website && (
                <a
                  href={logo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 md:px-4 py-2 text-sm font-medium rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
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
              <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
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
          <CodeTabs defaultTab="CDN Link" tabs={tabs} />
        </motion.div>
      </div>
    </main>
  );
}
