import { fileURLToPath, URL } from 'node:url'

import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/


const manifestIcons=[128,144,152,167,180,192,256,512].map(n=>({
  src: `icons/${n}.png`,
  sizes: `${n}x${n}`,
  type: 'image/png'
}))

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    AutoImport({
      imports: [
        'vue'
      ],
      dts: true,
      eslintrc: {
        enabled: true,
      },
    }),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      workbox: {
        cleanupOutdatedCaches: false,
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg}'
        ]
      },
      manifest: {
        name: 'AppStore-Demo',
        short_name: 'AppStore',
        description: 'AppStore Demo',
        theme_color: '#ffffff',
        display: "standalone",
        icons: manifestIcons
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5001
  }
})
