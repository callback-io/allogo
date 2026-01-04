import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getLogoBySlug, getAllLogoSlugs } from "@/lib/logos";
import { LogoDetailClient } from "./LogoDetailClient";
import { SITE_URL } from "@/lib/constants";

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

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: logo.name,
            item: `${SITE_URL}/logo/${logo.slug}`,
          },
        ],
      },
      {
        "@type": "ImageObject",
        contentUrl: `${SITE_URL}/logos/${logo.slug}/icon.${logo.fileType}`,
        creditText: logo.name,
        creator: {
          "@type": "Organization",
          name: logo.name,
        },
        copyrightNotice: `© ${logo.name}`,
      },
    ],
  };

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
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [`/logos/${logo.slug}/icon.${logo.fileType}`],
    },
    other: {
      "script:ld+json": JSON.stringify(structuredData),
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
