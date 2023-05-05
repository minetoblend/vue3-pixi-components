import { Graphics } from "pixi.js";
import { Ref, watchEffect } from "vue";

export function useGraphics(
  graphics: Ref<Graphics | null | undefined>,
  drawFn: (g: Graphics) => void
) {
  watchEffect(() => {
    if (graphics.value) {
      drawFn(graphics.value);
    }
  });
}

export function useGraphicsOnce(
  graphics: Ref<Graphics | null | undefined>,
  drawFn: (g: Graphics) => void
) {
  const stop = watchEffect(() => {
    if (graphics.value) {
      drawFn(graphics.value);
      stop();
    }
  });
}
