import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    proxy: {
      "/api": {
        target: "http://192.168.1.19:8000",
        changeOrigin: true,
      },
    },
    host: '0.0.0.0',
    port: 5174
  },
});
