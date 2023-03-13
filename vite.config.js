import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import manifest from './manifest';

export default defineConfig({
  server: {
    port: 8080,
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    VitePWA({ registerType: 'autoUpdate', manifest }),
    quasar({
      sassVariables: 'src/quasar-variables.sass',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
