# Contributing to Allogo

First off, thank you for considering contributing to Allogo! It's people like you that make this tool useful for the developer community.

## Table of Contents

- [Requesting a Logo](#requesting-a-logo)
- [Adding or Updating a Logo](#adding-or-updating-a-logo)
  - [1. Guidelines](#1-guidelines)
  - [2. Forbidden Brands](#2-forbidden-brands)
  - [3. Step-by-Step Guide](#3-step-by-step-guide)
- [Development](#development)

---

## Requesting a Logo

If you don't have the SVG yourself but want to see a logo added:

1. **Search First**: Ensure the logo doesn't already exist in the [Allogo library](https://allogo.vercel.app).
2. **Check Existing Issues**: Someone might have already requested it.
3. **Open an Issue**: Use the [Logo Request](https://github.com/callback-io/allogo/issues/new?template=logo_request.yml) template. Provide as many details as possible, especially links to official brand headers or press kits.

---

## Adding or Updating a Logo

### 1. Guidelines

To ensure high quality, please follow these rules:

- **Format**: Files **MUST** be in SVG format.
- **Vector Only**: The SVG must contain vector paths. **No embedded raster images** (PNG, JPEG inside SVG) are allowed.
- **Clean Code**:
  - Remove necessary metadata, comments, and hidden layers.
  - Simplify the `viewBox` if possible.
  - Ensure the SVG renders correctly on both light and dark backgrounds (or provide a robust single-color version).
- **Naming**: The directory name (slug) should be lowercase, using hyphens for spaces (e.g., `visual-studio-code` NOT `Visual Studio Code`).

### 2. Forbidden Brands

We respect the intellectual property and strict brand guidelines of certain companies. We **do not** accept logos from the following brands/organizations as they are known for aggressive brand protection:

- **Disney** (including Marvel Comics, Pixar, Star Wars, etc.)
- **Olympics** (IOC)
- **Other strictly protected brands** (e.g., heavily litigious entities)

_Note: Tools like "Marvel App" (prototyping tool) are allowed as they are distinct from Marvel Comics._

### 3. Step-by-Step Guide

#### Step 1: Prepare the SVG

Find the official logo. A good source is the company's "Press Kit", "Brand Assets", or valid vector repositories like [Warning: Verify License].
Save it as `icon.svg`.

#### Step 2: Add to Project

1. Create a new directory in `public/logos/`:
   ```bash
   mkdir public/logos/my-new-tool
   ```
2. Place your `icon.svg` inside this folder.

#### Step 3: Update Database

We provide a script to assist you. You don't need to edit the JSON manually for the initial entry.

1. Run the update script:

   ```bash
   node scripts/update-logos.js
   ```

   This will scan the folders and add any missing entries to `src/data/logos.json`.

2. **Manual Review**: Open `src/data/logos.json`, find your new entry, and ensure the details are correct:
   - **Name**: Use proper capitalization (e.g. "MyBrand").
   - **Website**: Add the official URL.
   - **Categories**: Add relevant tags (e.g. `["ai", "framework", "database"]`).

#### Step 4: Verify

Run the development server and check if your logo appears and renders correctly.

```bash
pnpm run dev
```

#### Step 5: Submit

1. Commit your changes:
   ```bash
   git add public/logos/my-new-tool src/data/logos.json
   git commit -m "Add MyNewTool logo"
   ```
2. Push to your fork.
3. Open a Pull Request!

---

## Development

If you want to improve the codebase (feature or bug fix):

1. **Clone the repo**:
   ```bash
   git clone https://github.com/callback-io/allogo.git
   ```
2. **Install dependencies**:
   ```bash
   pnpm install
   ```
3. **Run locally**:
   ```bash
   pnpm run dev
   ```
4. **Lint & Test**:
   ```bash
   pnpm run lint
   ```

Thank you for contributing!
