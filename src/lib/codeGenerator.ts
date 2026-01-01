/**
 * Clean SVG content by removing XML declarations and comments
 */
function cleanSvg(svgContent: string): string {
  return svgContent
    .replace(/<\?xml[^>]*\?>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .trim();
}

/**
 * Convert name to PascalCase component name with 'Icon' prefix
 */
function toComponentName(name: string): string {
  const baseName = name
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
  return "Icon" + baseName;
}

/**
 * Generate React component code
 */
export function generateReactComponent(name: string, svgContent: string): string {
  const cleanedSvg = cleanSvg(svgContent);
  const componentName = toComponentName(name);

  const reactSvg = cleanedSvg
    .replace(/class=/g, "className=")
    .replace(/fill-rule=/g, "fillRule=")
    .replace(/clip-rule=/g, "clipRule=")
    .replace(/stroke-width=/g, "strokeWidth=")
    .replace(/stroke-linecap=/g, "strokeLinecap=")
    .replace(/stroke-linejoin=/g, "strokeLinejoin=")
    .replace(/fill-opacity=/g, "fillOpacity=")
    .replace(/stroke-opacity=/g, "strokeOpacity=")
    .replace(/width="[^"]*"/, "width={size}")
    .replace(/height="[^"]*"/, "height={size}");

  return `import { SVGProps } from 'react';

interface ${componentName}Props extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function ${componentName}({ size = 24, ...props }: ${componentName}Props) {
  return (
    ${reactSvg.replace("<svg", "<svg {...props}")}
  );
}`;
}

/**
 * Generate Vue component code
 */
export function generateVueComponent(name: string, svgContent: string): string {
  const cleanedSvg = cleanSvg(svgContent);

  const vueSvg = cleanedSvg
    .replace(/width="[^"]*"/, ':width="size"')
    .replace(/height="[^"]*"/, ':height="size"');

  return `<script setup lang="ts">
defineProps<{
  size?: number | string;
}>();
</script>

<template>
  ${vueSvg.replace("<svg", '<svg v-bind="$attrs"')}
</template>`;
}

/**
 * Generate Angular component code
 */
export function generateAngularComponent(name: string, svgContent: string): string {
  const cleanedSvg = cleanSvg(svgContent);
  const componentName = toComponentName(name);
  const selector = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const angularSvg = cleanedSvg
    .replace(/width="[^"]*"/, '[attr.width]="size"')
    .replace(/height="[^"]*"/, '[attr.height]="size"');

  return `import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-${selector}',
  standalone: true,
  template: \`
    ${angularSvg}
  \`,
})
export class ${componentName}Component {
  @Input() size: number | string = 24;
}`;
}

/**
 * Generate Svelte component code
 */
export function generateSvelteComponent(name: string, svgContent: string): string {
  const cleanedSvg = cleanSvg(svgContent);

  const svelteSvg = cleanedSvg
    .replace(/width="[^"]*"/, "width={size}")
    .replace(/height="[^"]*"/, "height={size}");

  return `<script lang="ts">
  export let size: number | string = 24;
</script>

${svelteSvg.replace("<svg", "<svg {...$$restProps}")}`;
}

/**
 * Generate pure HTML/CSS code
 */
export function generateHtmlCode(slug: string, baseUrl?: string): string {
  const src = baseUrl ? `${baseUrl}/logos/${slug}/icon.svg` : `/logos/${slug}/icon.svg`;
  return `<img src="${src}" alt="${slug} logo" width="24" height="24" />`;
}
