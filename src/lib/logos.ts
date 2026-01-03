import { promises as fs } from "fs";
import path from "path";
import { Logo, LogoWithSvg } from "./types";

/**
 * Get all logos (excluding SVG content)
 */
export async function getAllLogos(): Promise<Logo[]> {
  try {
    // In development, to ensure fresh data, we should not cache
    // Even in production, Next.js Data Cache might handle it, but here it's raw file reading
    const dataPath = path.join(process.cwd(), "src/data/logos.json");
    const data = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(data) as Logo[];
  } catch {
    // If file does not exist, return empty array
    return [];
  }
}

/**
 * Get single logo by slug (including SVG content)
 */
export async function getLogoBySlug(slug: string): Promise<LogoWithSvg | null> {
  const logos = await getAllLogos();
  const logo = logos.find((l) => l.slug === slug);

  if (!logo) return null;

  // If explicit non-SVG type, return without content
  if (logo.fileType && logo.fileType !== "svg") {
    return { ...logo };
  }

  // Default to SVG behavior
  try {
    const svgPath = path.join(process.cwd(), "public/logos", slug, "icon.svg");
    const svgContent = await fs.readFile(svgPath, "utf-8");
    return { ...logo, svgContent };
  } catch {
    // If SVG fails but we might have fallback (logic can be extended here)
    return null;
  }
}

/**
 * Get all logo slugs (for SSG)
 */
export async function getAllLogoSlugs(): Promise<string[]> {
  const logos = await getAllLogos();
  return logos.map((l) => l.slug);
}
