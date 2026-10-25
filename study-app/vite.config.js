import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '上岸宝典 · Java求职修炼',
        short_name: '上岸宝典',
        description: '驾考宝典式的Java求职修炼:计划、知识点、刷题、错题本、标星',
        lang: 'zh-CN',
        theme_color: '#2456E5',
        background_color: '#F7F6F2',
        display: 'standalone',
        start_url: './',
        icons: [
          { src: './icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }
        ]
      }
    })
  ]
})
