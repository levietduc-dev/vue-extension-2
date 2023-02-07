import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import manifest from './manifest.json'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
