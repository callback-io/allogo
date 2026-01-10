"use client";

import Script from "next/script";

// Hardcoded ID to ensure it works regardless of environment variables
// Use environment variable first, fallback to hardcoded ID if not set
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-V0SYVW5WZ4";

export function GoogleAnalytics() {
  // Don't render if no GA ID is configured
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
