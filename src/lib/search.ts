import { Logo } from "./types";

/**
 * Search logos with fuzzy matching for name, slug, tags, and category.
 * Returns exact matches first.
 */
export function searchLogos(query: string, logos: Logo[]): Logo[] {
  const q = query.toLowerCase().trim();

  if (!q) return logos;

  const results = logos.filter((logo) => {
    if (logo.name.toLowerCase().includes(q)) return true;
    if (logo.slug.toLowerCase().includes(q)) return true;
    if (logo.tags?.some((tag) => tag.toLowerCase().includes(q))) return true;
    if (logo.category?.toLowerCase().includes(q)) return true;
    return false;
  });

  return results.sort((a, b) => {
    const aExact = a.name.toLowerCase() === q || a.slug.toLowerCase() === q ? 0 : 1;
    const bExact = b.name.toLowerCase() === q || b.slug.toLowerCase() === q ? 0 : 1;
    return aExact - bExact;
  });
}
