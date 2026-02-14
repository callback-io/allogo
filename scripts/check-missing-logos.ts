import { promises as fs } from "fs";
import path from "path";

async function checkMissingLogos() {
  const logosPath = path.join(process.cwd(), "src/data/logos.json");
  const logosData = await fs.readFile(logosPath, "utf-8");
  const logos = JSON.parse(logosData);

  console.log(`Checking ${logos.length} logos...`);

  const missing = [];

  for (const logo of logos) {
    if (logo.fileType !== "svg") continue; // Skip non-svg if any

    const svgPath = path.join(process.cwd(), "public/logos", logo.slug, "icon.svg");
    try {
      await fs.access(svgPath);
    } catch {
      missing.push(logo.slug);
    }
  }

  console.log(`Found ${missing.length} missing logos.`);
  if (missing.length > 0) {
    console.log("Missing slugs:", missing);
  }
}

checkMissingLogos().catch(console.error);
