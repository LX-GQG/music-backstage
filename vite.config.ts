/*
 * @Author: LX_DUG
 * @Date: 2022-11-24 20:51:51
 * @LastEditors: LX_DUG
 * @LastEditTime: 2022-12-28 16:57:15
 * @Description: description
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    hmr: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
