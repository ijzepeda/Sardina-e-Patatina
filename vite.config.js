
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    base: './', // Relative base path for GitHub Pages
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
            manifest: {
                name: 'Sardina de la Patatina',
                short_name: 'Sardina',
                description: 'A creative activity generator for daily inspiration.',
                theme_color: '#e8a87c',
                icons: [
                    {
                        src: 'icons/icon-192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'icons/icon-512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            }
        })
    ],
    server: {
        open: true,
    },
    build: {
        outDir: 'dist',
    },
});
