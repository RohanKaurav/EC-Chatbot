import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext', // ensure modern JS support
    esbuild: {
      format: 'esm', // or 'cjs' depending on your preference
    },
  },
})
