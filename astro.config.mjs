import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static', // Ensures Astro generates static files
  site: 'https://fdemirciler.github.io', // Your GitHub Pages URL
  base: '/tax_calculator_astro/', // Your repo name
  outDir: './docs', // Output build to /docs for GitHub Pages
});