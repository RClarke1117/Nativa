import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        menu: resolve(__dirname, 'menu.html'),
        visit: resolve(__dirname, 'visit.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        about: resolve(__dirname, 'about.html'),
      },
    },
  },
});
