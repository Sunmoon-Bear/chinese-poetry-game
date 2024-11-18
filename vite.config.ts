import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/chinese-poetry-game/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'esbuild'
  }
})
