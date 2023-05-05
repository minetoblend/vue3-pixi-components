import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Inspect from 'vite-plugin-inspect'

import { vuePixi, isCustomElement } from "vue3-pixi-components/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: { isCustomElement },
      },
    }),
    vuePixi(),
    Inspect(),
  ],
});
