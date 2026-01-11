
import { defineConfig } from 'vite';

export default defineConfig({
    base: './', // Relative base path for GitHub Pages
    server: {
        open: true,
    },
    build: {
        outDir: 'dist',
    },
});
