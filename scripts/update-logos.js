const fs = require("fs");
const path = require("path");

const LOGOS_DIR = path.join(process.cwd(), "public/logos");
const OUTPUT_FILE = path.join(process.cwd(), "src/data/logos.json");

function main() {
  if (!fs.existsSync(OUTPUT_FILE)) {
    console.log("src/data/logos.json not found");
    return;
  }

  let logos = JSON.parse(fs.readFileSync(OUTPUT_FILE, "utf-8"));
  const existingSlugs = new Set(logos.map((l) => l.slug));
  let addedCount = 0;

  // Scan public/logos directory
  if (fs.existsSync(LOGOS_DIR)) {
    const dirs = fs.readdirSync(LOGOS_DIR);

    for (const slug of dirs) {
      const dirPath = path.join(LOGOS_DIR, slug);
      if (!fs.statSync(dirPath).isDirectory()) continue;

      // Check if icon.svg exists
      if (!fs.existsSync(path.join(dirPath, "icon.svg"))) continue;

      // Add if missing from JSON
      if (!existingSlugs.has(slug)) {
        logos.push({
          slug: slug,
          name: slug.charAt(0).toUpperCase() + slug.slice(1), // Default name
          website: "", // Empty by default
          categories: [],
        });
        existingSlugs.add(slug);
        addedCount++;
        console.log(`Added new logo entry: ${slug}`);
      }
    }
  }

  if (addedCount > 0) {
    // Sort by name
    logos.sort((a, b) => a.name.localeCompare(b.name));
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(logos, null, 2));
    console.log(
      `Updated logos.json. Added ${addedCount} new entries. Please manually update their details (name, website, categories).`
    );
  } else {
    console.log("No new logos found to add.");
  }
}

main();
