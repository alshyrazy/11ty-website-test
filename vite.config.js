import { resolve } from 'path';

export default {
  root: './public',  // Set the root to Eleventy's output directory
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'public/index.html'),  // Point to the Eleventy-generated index.html
      },
    },
    outDir: '../public', // Vite will output files into `dist` directory
    emptyOutDir: false,
  },
  server: {
    open: true,
    port: 3000,
  },
};
