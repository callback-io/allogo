// Logo Data Types

export interface Logo {
  slug: string; // Unique identifier, e.g., "github"
  name: string; // Display name, e.g., "GitHub"
  category?: string; // Category, e.g., "Developer Tools"
  tags?: string[]; // Tags, e.g., ["git", "code"]
  website?: string; // Official website URL
  fileType: "svg" | "png" | "jpg"; // File extension, defaults to "svg"
}

export interface LogoWithSvg extends Logo {
  svgContent?: string; // SVG Content (optional, not present if fileType is png/jpg)
}
