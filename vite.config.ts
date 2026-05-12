import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import type { Plugin } from 'vite';

/**
 * Vite plugin: Convert CSS <link> tags to non-render-blocking async loads.
 * Uses the media="print" onload="this.media='all'" pattern recommended by web.dev.
 * Inlines minimal critical CSS for the initial paint (bg color, font, layout).
 */
function asyncCssPlugin(): Plugin {
  return {
    name: 'async-css',
    enforce: 'post',
    transformIndexHtml(html) {
      // Critical CSS: just enough for first paint (background, text color, font-family, basic layout)
      const criticalCSS = `
        *{margin:0;padding:0;box-sizing:border-box}
        html{-webkit-font-smoothing:antialiased}
        body{background:oklch(98% 0.01 260);color:oklch(15% 0 0);font-family:"Inter",ui-sans-serif,system-ui,sans-serif}
        .dark body,html.dark body{background:oklch(15% 0 0);color:oklch(98% 0.01 260)}
        #root{min-height:100vh}
      `.replace(/\s+/g, ' ').trim();

      // Replace blocking <link rel="stylesheet"> with async pattern
      return html.replace(
        /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/g,
        `<style>${criticalCSS}</style>
    <link rel="stylesheet" href="$1" media="print" onload="this.media='all'">
    <noscript><link rel="stylesheet" href="$1"></noscript>`
      );
    },
  };
}

export default defineConfig(() => {
  // Automatically resolve the public app URL:
  // 1. VITE_APP_URL if explicitly set (e.g. custom domain in Vercel settings)
  // 2. VERCEL_URL injected automatically by Vercel on every deployment
  // 3. Fallback for local dev
  if (!process.env.VITE_APP_URL) {
    if (process.env.VERCEL_URL) {
      process.env.VITE_APP_URL = `https://${process.env.VERCEL_URL}`;
    } else {
      process.env.VITE_APP_URL = 'http://localhost:5000';
    }
  }
  return {
    plugins: [
      react(),
      tailwindcss(),
      asyncCssPlugin(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: 'esnext',
      minify: 'esbuild',
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Code-split heavy libraries into separate async chunks
            if (id.includes('node_modules/three')) return 'three';
            if (id.includes('node_modules/gsap') || id.includes('node_modules/@gsap')) return 'gsap';
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-router') || id.includes('node_modules/react-helmet-async')) return 'react-vendor';
            if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) return 'motion';
            if (id.includes('node_modules/lucide-react') || id.includes('node_modules/clsx') || id.includes('node_modules/tailwind-merge')) return 'ui';
          },
        },
      },
      chunkSizeWarningLimit: 500,
      sourcemap: false, // Disable in production for smaller builds
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
      exclude: ['three', 'gsap'], // Exclude heavy libs from initial optimization
    },
    server: {
      host: '0.0.0.0',
      port: 5000,
      allowedHosts: true,
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: {
        ignored: ['**/.local/**', '**/node_modules/**'],
      },
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
      },
    },
  };
});
