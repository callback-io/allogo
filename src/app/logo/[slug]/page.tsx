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

  const isSvg = logo.fileType === "svg";
  const fileTypeUpper = logo.fileType.toUpperCase();

  const title = isSvg
    ? `${logo.name} Vector Logo (SVG) - Download & React/Vue Component | Allogo`
    : `${logo.name} Logo (${fileTypeUpper}) - Download High Quality Image | Allogo`;

  const description = isSvg
    ? `Download ${logo.name}'s official vector logo in SVG format. Copy as React component, Vue component, or raw SVG code. Free for developers and designers.`
    : `Download ${logo.name}'s official logo in high-quality ${fileTypeUpper} format. Free for developers and designers.`;

  const keywords = [
    logo.name,
    "logo",
    "download",
    logo.fileType,
    ...(isSvg ? ["svg", "vector", "react", "vue", "component"] : ["image", "transparent", "icon"]),
    ...(logo.tags || []),
  ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title: title,
      description: description,
      type: "website",
      images: [
        {
          url: `/logos/${logo.slug}/icon.${logo.fileType}`,
          width: 800,
          height: 600,
          alt: `${logo.name} Logo`,
        },
      ],
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
