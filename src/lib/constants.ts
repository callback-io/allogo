export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://allogo.org";
export const DOMAIN = new URL(SITE_URL).hostname;

// Trademark disclaimer - used in Footer and CodeTabs
export const TRADEMARK_DISCLAIMER =
  "All logos are trademarks of their respective owners. For commercial use, please verify usage rights with the brand.";
