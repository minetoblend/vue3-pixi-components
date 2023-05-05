import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [vue(), dts()],
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, "src/index.ts"),
        vite: path.resolve(__dirname, "vite/index.ts"),
      },
      name: "vue3-pixi-components",
      formats: ["es", "cjs"], // adding 'umd' requires globals set to every external module
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },
    outDir: path.resolve(__dirname, "lib"),
    rollupOptions: {
      external: ["vue", "pixi.js", "vite", "vue/compiler-sfc"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
