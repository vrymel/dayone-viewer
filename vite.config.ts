// This vite.config.ts is only created for shadcn/ui. 
// electron-vite is used electron.vite.config.ts by default. For now
// both files has the same contents. 
// The setup for shadcn/ui I followed from this article https://gbuszmicz.medium.com/how-to-add-shadcn-ui-to-an-electron-vite-app-in-5-easy-steps-cadfdf267823
// the article details how to remove this duplicate but I won't
// do that for now.

import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer/src')
      }
    },
    plugins: [react(), tailwindcss()]
  }
})
