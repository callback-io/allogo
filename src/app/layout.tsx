import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Silkscreen } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Header } from "@/components/features/Header";
import { Footer } from "@/components/features/Footer";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const silkscreen = Silkscreen({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-silkscreen",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Allogo - Brand Assets for READMEs, Presentations & UIs",
  description:
    "2900+ brand logos for developers. Perfect for READMEs, PPTs, UI mockups. Instant React/Vue/Angular/Svelte components & high-quality SVG/PNG downloads.",
  keywords: [
    "readme badges",
    "presentation logos",
    "ui brand icons",
    "svg logo",
    "png logo",
    "react component",
    "vue component",
    "angular component",
    "svelte component",
    "developer tools",
    "brand assets",
  ],
  authors: [{ name: "Allogo" }],
  openGraph: {
    title: "Allogo - Brand Assets for READMEs, Presentations & UIs",
    description:
      "2900+ brand logos for developers. Perfect for READMEs, PPTs, UI mockups. Instant React/Vue/Angular/Svelte components & high-quality SVG/PNG downloads.",
    type: "website",
    url: SITE_URL,
    images: [
      {
        url: "/screenshot.png",
        width: 1200,
        height: 630,
        alt: "Allogo - Brand Assets for Developers",
      },
    ],
  },
  alternates: {
    canonical: "./",
  },
  twitter: {
    card: "summary_large_image",
    title: "Allogo - Brand Assets for READMEs, Presentations & UIs",
    description:
      "2900+ brand logos for developers. Perfect for READMEs, PPTs, UI mockups. Instant React/Vue/Angular/Svelte components & high-quality SVG/PNG downloads.",
    creator: "@allogo",
    site: "@allogo",
    images: ["/screenshot.png"],
  },
  appleWebApp: {
    capable: true,
    title: "Allogo",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${silkscreen.variable} antialiased h-screen overflow-hidden bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.__name = (target, value) => {
                Object.defineProperty(target, "name", { value, configurable: true });
                return target;
              };
            `,
          }}
        />
        {/* JSON-LD Structured Data for Sitelinks Searchbox */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: `${SITE_URL}/`,
              name: "Allogo",
              description: "SVG Logos for Developers",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${SITE_URL}/?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <ThemeProvider>
          <div className="flex flex-col h-full">
            <Header />
            <main id="main-content" className="flex-1 overflow-y-auto scroll-smooth relative">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster position="bottom-center" />
        </ThemeProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
