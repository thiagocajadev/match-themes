import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const DEFAULT_BASE_PATH = '/match-themes/';
const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const sourceDir = path.resolve(projectRoot, 'src');

export default defineConfig({
  base: process.env.BASE_PATH ?? DEFAULT_BASE_PATH,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': sourceDir,
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: true,
  },
});
