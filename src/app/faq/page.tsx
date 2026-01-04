import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { FAQClient, type FAQCategory } from "./FAQClient";

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

// Define FAQ data here to share between Client Component and JSON-LD
const faqs: FAQCategory[] = [
  {
    category: "Usage & Scenarios",
    items: [
      {
        q: "Can I use these logos in my GitHub README or Presentations?",
        a: (
          <>
            <p>
              Absolutely! Allogo is designed to be the perfect source for{" "}
              <strong className="text-neutral-900 dark:text-neutral-200">
                GitHub README badges
              </strong>
              , <strong className="text-neutral-900 dark:text-neutral-200">Tech stack icons</strong>{" "}
              for your developer portfolio, and{" "}
              <strong className="text-neutral-900 dark:text-neutral-200">
                Presentation slides
              </strong>{" "}
              (like PPTs or pitch decks).
            </p>
            <p>
              We provide{" "}
              <strong className="text-neutral-900 dark:text-neutral-200">
                UI design components
              </strong>{" "}
              that work seamlessly in your mockups and prototypes.
            </p>
          </>
        ),
      },
    ],
  },
  {
    category: "Copyright & Licensing",
    items: [
      {
        q: "Is it free for commercial use?",
        a: (
          <>
            <p>
              The assets on Allogo are{" "}
              <strong className="text-neutral-900 dark:text-neutral-200">free to download</strong>{" "}
              and integrate into your projects.
            </p>
            <p>
              However, please note that the{" "}
              <strong className="text-neutral-900 dark:text-neutral-200">
                Brand Owner retains copyright
              </strong>{" "}
              of their respective logos. While you can use them for{" "}
              <strong className="text-neutral-900 dark:text-neutral-200">
                commercial projects
              </strong>{" "}
              referring to the brand (e.g., &quot;Supported by X&quot;), you generally cannot claim
              them as your own or resell them as standalone{" "}
              <strong className="text-neutral-900 dark:text-neutral-200">
                royalty-free vector logos
              </strong>
              .
            </p>
            <p className="text-sm italic opacity-80">
              Always respect the trademark guidelines of the specific company.
            </p>
          </>
        ),
      },
    ],
  },
  {
    category: "Formats & Quality",
    items: [
      {
        q: "Do you support transparent PNGs and Scalable Vectors?",
        a: (
          <>
            <p>
              Yes. We primarily offer{" "}
              <strong className="text-neutral-900 dark:text-neutral-200">
                high-quality SVG downloads
              </strong>{" "}
              which are{" "}
              <strong className="text-neutral-900 dark:text-neutral-200">
                scalable vector graphics
              </strong>{" "}
              perfect for any resolution.
            </p>
            <p>
              For broader compatibility, we also provide{" "}
              <strong className="text-neutral-900 dark:text-neutral-200">
                transparent background logo PNGs
              </strong>{" "}
              and JPGs. If an official SVG isn&apos;t available from the brand, we automatically
              provide a high-resolution raster fallback.
            </p>
          </>
        ),
      },
    ],
  },
  {
    category: "Technical Support",
    items: [
      {
        q: "Which frameworks are supported?",
        a: (
          <>
            <p>
              We generate ready-to-use coding components for all major modern frontend frameworks:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>
                <strong className="text-neutral-900 dark:text-neutral-200">React components</strong>{" "}
                (.tsx)
              </li>
              <li>
                <strong className="text-neutral-900 dark:text-neutral-200">Vue components</strong>{" "}
                (.vue)
              </li>
              <li>
                <strong className="text-neutral-900 dark:text-neutral-200">
                  Angular components
                </strong>{" "}
                (.ts)
              </li>
              <li>
                <strong className="text-neutral-900 dark:text-neutral-200">
                  Svelte components
                </strong>{" "}
                (.svelte)
              </li>
            </ul>
            <p className="mt-4">
              We also provide direct <strong>CDN links</strong> for quick prototyping without
              installing files.
            </p>
          </>
        ),
      },
    ],
  },
];

// Helper to generate text-only answer for Schema
// Note: This is a simplified version. For complex HTML, a parser would be better,
// but for our static content, we can manually provide the text representation or stringify carefully.
// To avoid complexity, we will map the questions to their plain text answers for the Schema.
const faqSchemaData = [
  {
    q: "Can I use these logos in my GitHub README or Presentations?",
    a: "Absolutely! Allogo is designed to be the perfect source for GitHub README badges, Tech stack icons for your developer portfolio, and Presentation slides (like PPTs or pitch decks). We also provide UI design components that work seamlessly in your mockups and prototypes.",
  },
  {
    q: "Is it free for commercial use?",
    a: "The assets on Allogo are free to download and integrate into your projects. However, the Brand Owner retains copyright. You can use them for commercial projects referring to the brand (e.g., 'Supported by X'), but generally cannot claim them as your own or resell them as standalone royalty-free vector logos. Always respect trademark guidelines.",
  },
  {
    q: "Do you support transparent PNGs and Scalable Vectors?",
    a: "Yes. We offer high-quality SVG downloads (scalable vector graphics) and transparent background logo PNGs/JPGs. If an official SVG isn't available, we provide a high-resolution raster fallback.",
  },
  {
    q: "Which frameworks are supported?",
    a: "We generate ready-to-use components for React (.tsx), Vue (.vue), Angular (.ts), and Svelte (.svelte). We also provide direct CDN links for quick prototyping.",
  },
];

export default function FAQPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqSchemaData.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <FAQClient faqs={faqs} />
    </>
  );
}
