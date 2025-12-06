import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // For GitHub Pages with custom domain - no base needed
    // If you ever deploy without custom domain, use: base: '/ritams.github.io/'
})
