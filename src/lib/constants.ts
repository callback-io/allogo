export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://allogo.org";
export const DOMAIN = new URL(SITE_URL).hostname;
