import type { Metadata } from "next";
import { Geist, Geist_Mono, Silkscreen } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/features/Header";
import { Footer } from "@/components/features/Footer";
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

export const metadata: Metadata = {
  title: "Allogo - SVG Logos for Developers",
  description:
    "Download SVG logos and copy React/Vue component code. Free, open source logo library for developers.",
  keywords: ["svg", "logo", "react", "vue", "component", "download", "free"],
  authors: [{ name: "Allogo" }],
  openGraph: {
    title: "Allogo - SVG Logos for Developers",
    description: "Download SVG logos and copy React/Vue component code.",
    type: "website",
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
      </body>
    </html>
  );
}
