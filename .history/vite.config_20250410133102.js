/*import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
*/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    fs: {
      allow: ['..'] // Permet d'accéder aux fichiers en dehors du root
    }
  plugins: [react()],
  css: {
    postcss: './postcss.config.js'
  }
})