import { PixiPlugin } from "./plugin";
import PixiViewport from "./PixiViewport.vue";

export * from "./plugin";
export * from "./renderer";
export * from "./elements";
export * from "./composables";
export * from "./globalHitArea";

export { default as PixiViewport } from "./PixiViewport.vue";

export default PixiPlugin;

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    PixiViewport: typeof PixiViewport;
  }
}
