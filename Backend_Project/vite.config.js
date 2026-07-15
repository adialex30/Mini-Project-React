import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    // TAMBAHKAN BLOK SERVER INI (WAJIB AGAR REACT MUNCUL)
    server: {
        cors: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
});
