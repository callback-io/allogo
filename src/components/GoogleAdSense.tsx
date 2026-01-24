"use client";

import Script from "next/script";

// AdSense Publisher ID from environment variable
// Use environment variable first, fallback to hardcoded ID if not set
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-6667583540226412";

export function GoogleAdSense() {
  // Don't render if no AdSense ID is configured
  if (!ADSENSE_ID) return null;

  return (
    <Script
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
