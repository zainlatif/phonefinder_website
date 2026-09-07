import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'duplicate-about-senators-sql.trycloudflare.com',
      'drilling-care-excuse-sent.trycloudflare.com', // ✅ New one added
    ],
  },
})
