"use client";

import { useState } from "react";

export type SortOrder = "name-asc" | "name-desc";
export type LogoSize = "small" | "medium" | "large";

interface ToolbarProps {
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
  logoSize: LogoSize;
  onSizeChange: (size: LogoSize) => void;
  totalCount: number;
}

export function Toolbar({
  sortOrder,
  onSortChange,
  logoSize,
  onSizeChange,
  totalCount,
}: ToolbarProps) {
  const [showSortMenu, setShowSortMenu] = useState(false);

  const sortOptions: { value: SortOrder; label: string }[] = [
    { value: "name-asc", label: "Name A-Z" },
    { value: "name-desc", label: "Name Z-A" },
  ];

  const currentSortLabel = sortOptions.find((o) => o.value === sortOrder)?.label || "Sort";

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="text-sm text-neutral-500 dark:text-neutral-400">{totalCount} results</div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
              />
            </svg>
            <span>{currentSortLabel}</span>
          </button>

          {showSortMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowSortMenu(false)} />
              <div className="absolute right-0 top-full mt-1 z-20 min-w-[120px] bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 py-1">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onSortChange(option.value);
                      setShowSortMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors ${
                      sortOrder === option.value
                        ? "text-blue-600 dark:text-blue-400 font-medium"
                        : "text-neutral-700 dark:text-neutral-300"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden">
          <button
            onClick={() => onSizeChange("small")}
            disabled={logoSize === "small"}
            className={`p-1.5 transition-colors ${
              logoSize === "small"
                ? "bg-neutral-200 dark:bg-neutral-600 text-neutral-400"
                : "hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400"
            }`}
            title="Smaller logos"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <div className="w-px h-4 bg-neutral-200 dark:bg-neutral-600" />
          <button
            onClick={() => onSizeChange("large")}
            disabled={logoSize === "large"}
            className={`p-1.5 transition-colors ${
              logoSize === "large"
                ? "bg-neutral-200 dark:bg-neutral-600 text-neutral-400"
                : "hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400"
            }`}
            title="Larger logos"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
