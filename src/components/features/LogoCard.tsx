"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Logo } from "@/lib/types";
import type { LogoSize } from "./Toolbar";

interface LogoCardProps {
  logo: Logo;
  index: number;
  logoSize?: LogoSize;
}

const SIZE_CONFIG: Record<LogoSize, { iconSize: number; imageSize: number; padding: string }> = {
  small: { iconSize: 48, imageSize: 36, padding: "p-2" },
  medium: { iconSize: 64, imageSize: 48, padding: "p-3" },
  large: { iconSize: 80, imageSize: 60, padding: "p-3" },
};

export function LogoCard({ logo, logoSize = "medium" }: LogoCardProps) {
  const { iconSize, imageSize, padding } = SIZE_CONFIG[logoSize];
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Link href={`/logo/${logo.slug}`}>
      <div
        className={`group rounded-xl ${padding} flex flex-col items-center justify-center transition-all duration-200 cursor-pointer hover:-translate-y-1 bg-white dark:bg-neutral-900 shadow-lg shadow-neutral-200/60 dark:shadow-black/40 hover:shadow-xl hover:shadow-neutral-300/60 dark:hover:shadow-black/60 h-full`}
      >
        <div
          className="flex items-center justify-center mb-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 relative overflow-hidden"
          style={{ height: iconSize, width: iconSize }}
        >
          {/* Skeleton with shimmer animation */}
          {!isLoaded && (
            <div
              className="absolute inset-0 rounded-lg overflow-hidden"
              style={{ height: iconSize, width: iconSize }}
            >
              <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-700" />
              <div
                className="absolute inset-0 -translate-x-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  animation: "shimmer 1.5s infinite",
                }}
              />
            </div>
          )}
          <Image
            src={`/logos/${logo.slug}/icon.${logo.fileType || "svg"}`}
            alt={`${logo.name} logo`}
            width={imageSize}
            height={imageSize}
            style={{ width: "auto", height: "auto" }}
            className={`max-w-full max-h-full object-contain transition-opacity duration-200 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsLoaded(true)}
            unoptimized
          />
        </div>

        <h3 className="text-xs font-medium text-center truncate w-full text-neutral-800 dark:text-neutral-100">
          {logo.name}
        </h3>
      </div>
    </Link>
  );
}
