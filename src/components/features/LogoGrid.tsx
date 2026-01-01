"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { LogoCard } from "./LogoCard";
import type { Logo } from "@/lib/types";
import type { LogoSize } from "./Toolbar";

interface LogoGridProps {
  logos: Logo[];
  logoSize?: LogoSize;
}

const SIZE_CONFIG: Record<LogoSize, { rowHeight: number; baseColumns: number }> = {
  small: { rowHeight: 160, baseColumns: 8 },
  medium: { rowHeight: 160, baseColumns: 6 },
  large: { rowHeight: 160, baseColumns: 6 },
};

const GAP = 16;

function useColumnCount(logoSize: LogoSize = "medium") {
  const [columns, setColumns] = useState(SIZE_CONFIG[logoSize].baseColumns);

  useEffect(() => {
    function updateColumns() {
      const width = window.innerWidth;
      const base = SIZE_CONFIG[logoSize].baseColumns;

      if (width < 640) setColumns(Math.max(2, base - 4));
      else if (width < 768) setColumns(Math.max(3, base - 3));
      else if (width < 1024) setColumns(Math.max(4, base - 2));
      else if (width < 1280) setColumns(Math.max(5, base - 1));
      else setColumns(base);
    }

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, [logoSize]);

  return columns;
}

export function LogoGrid({ logos, logoSize = "medium" }: LogoGridProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const columns = useColumnCount(logoSize);
  const rowHeight = SIZE_CONFIG[logoSize].rowHeight;

  const rowCount = Math.ceil(logos.length / columns);

  const getRowLogos = useCallback(
    (rowIndex: number) => {
      const start = rowIndex * columns;
      const end = Math.min(start + columns, logos.length);
      return logos.slice(start, end);
    },
    [logos, columns]
  );

  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => document.getElementById("main-content"),
    estimateSize: () => rowHeight + GAP,
    overscan: 3,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  });

  if (logos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-neutral-300 mb-2">No logos found</h3>
        <p className="text-neutral-500">Try a different search term</p>
      </div>
    );
  }

  const virtualRows = virtualizer.getVirtualItems();

  return (
    <div ref={listRef}>
      <div
        style={{
          height: virtualizer.getTotalSize(),
          width: "100%",
          position: "relative",
        }}
      >
        {virtualRows.map((virtualRow) => {
          const rowLogos = getRowLogos(virtualRow.index);
          return (
            <div
              key={virtualRow.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: rowHeight,
                transform: `translateY(${
                  virtualRow.start - (virtualizer.options.scrollMargin ?? 0)
                }px)`,
              }}
            >
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                }}
              >
                {rowLogos.map((logo, index) => (
                  <LogoCard key={logo.slug} logo={logo} index={index} logoSize={logoSize} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center text-sm text-neutral-500 py-4">{logos.length} logos</div>
    </div>
  );
}
