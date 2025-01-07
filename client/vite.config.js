import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    proxy: {
      '/api': {
        // target: 'https://realstate-app-practice.onrender.com',
        changeOrigin: true,
        secure: false,
    },
  },
},
  plugins: [react()],
})
