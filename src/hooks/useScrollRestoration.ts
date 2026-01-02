"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

const SCROLL_POSITIONS_KEY = "scroll-positions";

/**
 * Get scroll positions map from sessionStorage
 */
function getScrollPositions(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const stored = sessionStorage.getItem(SCROLL_POSITIONS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/**
 * Save scroll position for a specific path (only if > 300 to skip header/banner)
 * If position <= 300, clear the saved position (user is at top)
 */
function saveScrollPosition(path: string, position: number) {
  try {
    const positions = getScrollPositions();

    if (position <= 300) {
      // User is at top, remove saved position
      delete positions[path];
    } else {
      // Save the position
      positions[path] = position;
    }

    sessionStorage.setItem(SCROLL_POSITIONS_KEY, JSON.stringify(positions));
  } catch {
    // Ignore errors
  }
}

/**
 * Get saved scroll position for a specific path
 */
function getSavedScrollPosition(path: string): number | null {
  const positions = getScrollPositions();
  return positions[path] ?? null;
}

/**
 * Custom hook for scroll restoration in Next.js static export.
 * Works with custom scrollable containers (not window).
 *
 * @param scrollContainerId - The ID of the scrollable container element
 */
export function useScrollRestoration(scrollContainerId: string) {
  const pathname = usePathname();
  const isRestoringRef = useRef(false);

  // Get scroll element helper
  const getScrollElement = useCallback(() => {
    return document.getElementById(scrollContainerId);
  }, [scrollContainerId]);

  // Save scroll position on ANY click (captures position before navigation)
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Check if click is on or within a link
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (link && link.href) {
        const scrollElement = getScrollElement();
        if (scrollElement) {
          saveScrollPosition(pathname, scrollElement.scrollTop);
        }
      }
    };

    // Use capture phase to get the click before navigation
    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, [pathname, getScrollElement]);

  // Also save on scroll (for back button from other sites)
  useEffect(() => {
    const scrollElement = getScrollElement();
    if (!scrollElement) return;

    let saveTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      if (isRestoringRef.current) return;

      const position = scrollElement.scrollTop;
      if (saveTimeout) clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        saveScrollPosition(pathname, position);
      }, 200);
    };

    scrollElement.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      scrollElement.removeEventListener("scroll", handleScroll);
      if (saveTimeout) clearTimeout(saveTimeout);
    };
  }, [pathname, scrollContainerId, getScrollElement]);

  // Restore scroll position on mount
  useEffect(() => {
    const savedPosition = getSavedScrollPosition(pathname);
    if (savedPosition === null || savedPosition <= 0) return;

    const scrollElement = getScrollElement();
    if (!scrollElement) return;

    isRestoringRef.current = true;

    let attempts = 0;
    const maxAttempts = 100; // More attempts
    let rafId: number | null = null;

    const tryRestore = () => {
      attempts++;

      // Check if the scrollable content is tall enough
      if (scrollElement.scrollHeight >= savedPosition) {
        scrollElement.scrollTop = savedPosition;

        // Verify it worked (within tolerance)
        if (Math.abs(scrollElement.scrollTop - savedPosition) < 50) {
          isRestoringRef.current = false;
          return;
        }
      }

      if (attempts < maxAttempts) {
        rafId = requestAnimationFrame(tryRestore);
      } else {
        isRestoringRef.current = false;
      }
    };

    // Start after initial render
    const timer = setTimeout(() => {
      rafId = requestAnimationFrame(tryRestore);
    }, 50);

    return () => {
      clearTimeout(timer);
      if (rafId) cancelAnimationFrame(rafId);
      isRestoringRef.current = false;
    };
  }, [pathname, scrollContainerId, getScrollElement]);
}
