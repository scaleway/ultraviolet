import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rolldownOptions: {
      external: ['fsevents'],
    },
  },
  plugins: [react()],
  server: {
    // Sends all requests to index.html if file not found
    fs: {
      allow: ['.'], // or paths as needed
    },
  },
})
