"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { codeToHtml } from "shiki";
import { CopyButton } from "./CopyButton";

interface CodeTab {
  label: string;
  code: string;
  language: string;
  filename: string;
}

interface CodeTabsProps {
  tabs: CodeTab[];
  defaultTab?: string;
}

function getShikiLang(language: string): string {
  const langMap: Record<string, string> = {
    tsx: "tsx",
    typescript: "typescript",
    vue: "vue",
    svelte: "svelte",
    html: "html",
  };
  return langMap[language] || "html";
}

export function CodeTabs({ tabs, defaultTab }: CodeTabsProps) {
  const { resolvedTheme } = useTheme();
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.label || "");
  const [html, setHtml] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = !mounted || resolvedTheme === "dark";
  const currentTab = tabs.find((t) => t.label === activeTab) || tabs[0];

  useEffect(() => {
    if (!currentTab) return;

    let cancelled = false;
    setIsLoading(true);

    async function highlight() {
      try {
        const highlighted = await codeToHtml(currentTab.code, {
          lang: getShikiLang(currentTab.language),
          theme: isDark ? "github-dark-default" : "github-light-default",
        });
        if (!cancelled) {
          setHtml(highlighted);
          setIsLoading(false);
        }
      } catch {
        if (!cancelled) {
          setHtml("");
          setIsLoading(false);
        }
      }
    }

    highlight();

    return () => {
      cancelled = true;
    };
  }, [currentTab, isDark]);

  if (!currentTab) return null;

  return (
    <div className="relative rounded-xl bg-neutral-100 dark:bg-neutral-900 shadow-lg shadow-neutral-300/50 dark:shadow-black/20 overflow-hidden">
      {/* Header with tabs */}
      <div className="flex items-center justify-between px-2 py-1.5 bg-neutral-200 dark:bg-neutral-800">
        <div className="flex items-center gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === tab.label
                  ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-500 font-mono hidden sm:inline">
            {currentTab.filename}
          </span>
          <CopyButton content={currentTab.code} label="Copy" />
        </div>
      </div>

      {/* Code content - hide scrollbar on mobile */}
      <div className="overflow-x-auto scrollbar-hide">
        {isLoading ? (
          <pre className="p-4 text-sm leading-relaxed">
            <code className="text-neutral-600 dark:text-neutral-400">{currentTab.code}</code>
          </pre>
        ) : html ? (
          <div
            className="p-4 text-sm leading-relaxed [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0 [&_code]:!bg-transparent"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre className="p-4 text-sm leading-relaxed">
            <code className="text-neutral-700 dark:text-neutral-300">{currentTab.code}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
