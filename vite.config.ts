import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three'],
          'gsap-vendor': ['gsap', 'gsap/ScrollTrigger'],
          'react-vendor': ['react', 'react-dom'],
          'lenis-vendor': ['lenis'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});

