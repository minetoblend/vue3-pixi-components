import { Plugin } from "vue";
import PixiViewport from "./PixiViewport.vue";

export const PixiPlugin: Plugin = {
  install(app, ...options) {
    app.component('PixiViewport', PixiViewport)
  },
};
