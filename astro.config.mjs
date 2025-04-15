import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static', // Ensures Astro generates static files
  site: 'https://fdemirciler.github.io', // Replace with your GitHub username
  base: '/tax_calculator_astro/', // Replace with your repo name (if not user/organization site)
});