import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');

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
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
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
