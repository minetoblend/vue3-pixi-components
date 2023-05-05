<script setup lang="ts">
import { ref } from "vue";
import CursorSprite from "./CursorSprite.vue";

const enabled = ref(true);
</script>

<template>
  <div>
    <p>
      <button @click="enabled = !enabled">Toggle</button>

      <span style="margin-left: 10px"> Sprite visible: {{ enabled }} </span>
    </p>
    <pixi-viewport :width="640" :height="480">
      <CursorSprite :x="100" :y="100" v-if="enabled" />
    </pixi-viewport>
  </div>
</template>
