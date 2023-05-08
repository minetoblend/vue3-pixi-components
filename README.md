# vue3-pixi-components

[![npm](https://img.shields.io/npm/v/vue3-pixi-components)](https://www.npmjs.com/package/vue3-pixi-components)

> Use Vue 3 to create PixiJS applications

This library provides it's own vue renderer that will create PixiJS objects instead of html elments. It's still pretty early in development, but should already support a great amount of features from PixiJS.

```html
<script setup lang="ts">
import textureUrl from "@/assets/myTexture.png";
import { Reactangle } from "pixi.js";

const texture = Texture.from(textureUrl);
const hitArea = new Rectangle(0, 0, 64, 64);

function onClick() {
  console.log('sprite was clicked!');
}
</script>

<template>
  <container>
    <sprite :texture="texture" :hit-area="hitArea" @click="onClick" />
  </container>
</template>
```

## Demo

Check out the demo project:

[Demo](https://minetoblend.github.io/vue3-pixi-components-demo/) | [Source](https://github.com/minetoblend/vue3-pixi-components-demo)


## Install

```sh
# install with npm
npm install vue3-pixi-components

# install with yarn
yarn add vue3-pixi-components
```

## Creating an application manually

```ts
import { createPixiApp } from "vue3-pixi-components";
import App from "./App.vue";

const pixiApp = new PIXI.Application();

document.body.appendChild(pixiApp.view);

const app = createPixiApp(App);

app.mount(pixiApp.stage);
```

## Using the PixiViewport component

The PixiViewport component can be used to embed a pixi app into an existing vue app.

```html
<script setup lang="ts">
import { PixiViewport } from "vue-3-pixi-components";
</script>

<template>
  <div>
    <PixiViewport :width="640" :height="480">
      <!-- Everything in here is going to be PixiJS objects -->
    </PixiViewport>
  </div>
</template>
```

## Install the vite plugin

The vite plugin adds the ability to specify texture paths on sprites & other components that use textures, the same way as the `src` attribute on an image.

```ts
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vuePixi, isCustomElement } from "vue3-pixi-components/vite";

export default defineConfig({
  plugins: [
    vue({
      template: {
        // remove the unknown element warnings
        compilerOptions: { isCustomElement },
      },
    }),
    vuePixi(),
  ],
});
```

### Usage in template

The vite plugin will detect any texture props containing the path to an image, and will replace it with a reference to a texture object.

```html
<sprite texture="@/assets/myTexture.png" />
```

## Components

The following PixiJS objects are supported out of the box:

* Container
* Sprite
* Graphics
* Text
* BitmapText
* TilingSprite
* AnimatedSprite
* Mesh
* NineSlicePlane
* SimpleMesh
* SimplePlane
* SimpleRope

## Props

Most props will work just as the properties on the corresponding PixiJS objects. However, props that accept a `Point` are handeled a bit different. They can also be used with X/Y suffix (except for the `position` prop, which just uses the `x`/`y` props instead).
```html
<container :scale-x="10" :skew-y="0.5" />
```

## Events

All events emitted by pixi objects are supported. *Some* of vue's event modifiers will work, like `@click.left`, however more often than not using them will cause an error. Adding an event listener to an element will currently automatically set the element's `eventMode` to `static`.

### Graphics @draw event
When using `<grahpics />` there is a special `@draw` event.
This will set up a `watchEffect` internally that will automatically call the event handler again if any dependencies on the draw method have changed.

```html
<script setup lang="ts">
import { Graphics } from "pixi.js";

const props = defineProps<{
  x: number
  y: number
  width: number
  height: number
}>()

function draw(g: Graphics) {
  g.clear()
  g.lineStyle(3, 0xffffff)

  const { x, y, width, height } = props
  g.drawRoundedRect(x, y, width, height, 5)
}
</script>

<template>
  <graphics @draw="draw" />
</template>
```

