import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getLogoBySlug, getAllLogoSlugs } from "@/lib/logos";
import { LogoDetailClient } from "./LogoDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params
export async function generateStaticParams() {
  const slugs = await getAllLogoSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate page metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const logo = await getLogoBySlug(slug);

  if (!logo) {
    return {
      title: "Logo Not Found - Allogo",
    };
  }

  return {
    title: `${logo.name} Logo SVG - Download & React/Vue Component | Allogo`,
    description: `Download ${logo.name}'s official SVG logo. Copy as React component, Vue component, or raw SVG code. Free for developers and designers.`,
    keywords: [
      logo.name,
      "svg",
      "logo",
      "download",
      "react",
      "vue",
      "component",
      ...(logo.tags || []),
    ],
    openGraph: {
      title: `${logo.name} Logo SVG - Allogo`,
      description: `Download ${logo.name}'s SVG logo and copy React/Vue component code.`,
      type: "website",
    },
  };
}

export default async function LogoPage({ params }: PageProps) {
  const { slug } = await params;
  const logo = await getLogoBySlug(slug);

  if (!logo) {
    notFound();
  }

  return <LogoDetailClient logo={logo} />;
}
