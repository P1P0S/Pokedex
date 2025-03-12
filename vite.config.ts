import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
export default defineConfig({
  plugins: [tailwindcss()],
  base: '/Pokedex/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
