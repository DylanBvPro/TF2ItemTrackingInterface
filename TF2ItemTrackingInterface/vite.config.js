import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    proxy: {
        '/api': {
            target: 'http://localhost:YOUR_BACKEND_PORT',
            changeOrigin: true,
            secure: false
        }
    }
}
});
