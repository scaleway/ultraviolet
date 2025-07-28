import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['fsevents'],
    },
  },
  plugins: [
    react({
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
      jsxImportSource: '@emotion/react',
    }),
  ],
  server: {
    // Sends all requests to index.html if file not found
    fs: {
      allow: ['.'], // or paths as needed
    },
  },
})
