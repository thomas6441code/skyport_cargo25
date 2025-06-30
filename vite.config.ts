import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: 'automatic',
        target: 'es2020' // Add this for Three.js compatibility
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @import "@/scss/variables";
                    @import "@/scss/mixins";
                `,
            },
        },
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
            // Add Three.js aliases if needed
            three: resolve(__dirname, 'node_modules/three'),
        },
    },
    optimizeDeps: {
        include: [
            'three',
            '@react-three/fiber',
            '@react-three/drei',
            'three-mesh-bvh'
        ],
        esbuildOptions: {
            target: 'es2020',
            supported: {
                'top-level-await': true // For modern browsers
            }
        }
    },
    build: {
        target: 'es2020', // Important for Three.js
        rollupOptions: {
            onwarn(warning, warn) {
                // Suppress specific Three.js warnings
                if (warning.code === 'THIS_IS_UNDEFINED') return
                if (warning.code === 'SOURCEMAP_ERROR') return
                warn(warning)
            }
        },
        commonjsOptions: {
            transformMixedEsModules: true // For Three.js dependencies
        }
    }
});
