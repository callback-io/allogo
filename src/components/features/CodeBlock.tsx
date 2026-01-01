"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { codeToHtml } from "shiki";
import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const { resolvedTheme } = useTheme();
  const [html, setHtml] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = !mounted || resolvedTheme === "dark";

  useEffect(() => {
    let cancelled = false;

    async function highlight() {
      try {
        const highlighted = await codeToHtml(code, {
          lang: language === "vue" ? "vue" : language === "tsx" ? "tsx" : "html",
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
  }, [code, language, isDark]);

  return (
    <div className="relative rounded-xl bg-neutral-100 dark:bg-neutral-900 shadow-lg shadow-neutral-300/50 dark:shadow-black/20 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-200 dark:bg-neutral-800">
        <span className="text-xs text-neutral-600 dark:text-neutral-400 uppercase">
          {filename || language}
        </span>
        <CopyButton content={code} label="Copy" />
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <pre className="p-4 text-sm leading-relaxed">
            <code className="text-neutral-600 dark:text-neutral-400">{code}</code>
          </pre>
        ) : html ? (
          <div
            className="p-4 text-sm leading-relaxed [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0 [&_code]:!bg-transparent"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre className="p-4 text-sm leading-relaxed">
            <code className="text-neutral-700 dark:text-neutral-300">{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
