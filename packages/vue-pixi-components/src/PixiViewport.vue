<script setup lang="ts">
import { Application, Container } from "pixi.js";
import {
  onMounted,
  ref,
  warn,
  watch,
  renderSlot,
  App,
  onBeforeUnmount,
  useSlots,
} from "vue";
import { createPixiApp } from "./renderer";

const props = withDefaults(
  defineProps<{
    width?: number;
    height?: number;

    alpha?: boolean;
    antialias?: boolean;
    depth?: boolean;
    desynchronized?: boolean;
    failIfMajorPerformanceCaveat?: boolean;
    powerPreference?: WebGLPowerPreference;
    premultipliedAlpha?: boolean;
    preserveDrawingBuffer?: boolean;
    stencil?: boolean;
  }>(),
  {
    antialias: true,
    stencil: true,
  }
);

const slots = useSlots();

const canvas = ref<HTMLCanvasElement>();
let pixiApp: Application | undefined = undefined;
let app: App<Container> | undefined = undefined;

onMounted(() => {
  const context = canvas.value?.getContext("webgl", {
    alpha: props.alpha,
    antialias: props.antialias,
    depth: props.depth,
    desynchronized: props.desynchronized,
    failIfMajorPerformanceCaveat: props.failIfMajorPerformanceCaveat,
    premultipliedAlpha: props.premultipliedAlpha,
    preserveDrawingBuffer: props.preserveDrawingBuffer,
    stencil: props.stencil,
  });

  if (!context) {
    warn("could not crate webgl context");
    return;
  }

  pixiApp = new Application({
    view: canvas.value,
    width: props.width,
  });

  app = createPixiApp({
    render() {
      return renderSlot(slots, "default");
    },
  });

  app.mount(pixiApp.stage);
});

onBeforeUnmount(() => {
  app?.unmount();
  app = undefined;

  pixiApp?.destroy();
  pixiApp = undefined;
});

watch(
  () => [props.width, props.height],
  () => pixiApp?.resize()
);
</script>

<template>
  <canvas ref="canvas" :width="width" :height="height" />
</template>
