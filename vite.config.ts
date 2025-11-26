import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  base: '/new-unifed-/',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Votre serveur API backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
