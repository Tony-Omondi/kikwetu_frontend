import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // allows external access
    allowedHosts: [
      '425bdc4fe54b.ngrok-free.app', // your current ngrok URL
    ],
    port: 5173,
  },
})
