import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://de2.api.radio-browser.info',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/json/stations'),
      },
    },
  },
})
