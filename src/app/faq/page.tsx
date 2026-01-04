import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { FAQClient } from "./FAQClient";

export const metadata: Metadata = {
  title: "Allogo FAQ - Design Assets Usage & Developer Guide",
  description:
    "Common questions about using Allogo's SVG/PNG brands for GitHub READMEs, presentations, and UI design. Learn about commercial use policies and framework support.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Allogo FAQ - Usage Guide for Developers & Designers",
    description:
      "Can I use these logos for commercial projects? Do you support scalable vectors? Find answers about our React/Vue/Angular/Svelte components and PNG/SVG downloads.",
    url: `${SITE_URL}/faq`,
  },
};

export default function FAQPage() {
  return <FAQClient />;
}
