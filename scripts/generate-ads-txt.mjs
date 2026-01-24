/**
 * Generate ads.txt file from environment variable
 *
 * Usage: node scripts/generate-ads-txt.mjs
 *
 * Environment variable:
 * - NEXT_PUBLIC_ADSENSE_ID: ca-pub-xxxxxxxxxx (with ca- prefix)
 *
 * Output: public/ads.txt
 * Format: google.com, pub-xxxxxxxxxx, DIRECT, f08c47fec0942fa0
 */

import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "../public");

// Get AdSense ID from environment variable, fallback to hardcoded ID
const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-6667583540226412";

// Extract pub ID from ca-pub-xxxxxxxxxx format
// ads.txt uses pub-xxxxxxxxxx (without ca- prefix)
const pubId = adsenseId.replace("ca-", "");

// Generate ads.txt content
// f08c47fec0942fa0 is Google's TAG ID (fixed value)
const adsTxtContent = `google.com, ${pubId}, DIRECT, f08c47fec0942fa0
`;

// Write to public/ads.txt
const outputPath = resolve(publicDir, "ads.txt");
writeFileSync(outputPath, adsTxtContent, "utf-8");

console.log(`✅ Generated ads.txt with publisher ID: ${pubId}`);
