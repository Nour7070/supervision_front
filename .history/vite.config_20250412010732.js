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
  plugins: [react()],
  server: {
    fs: {
      allow: ['..'] // Permet d'accéder aux fichiers en dehors du root
    },
    hmr: {
      overlay: false // Désactive l'overlay d'erreur HMR
    }
  }
});