import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PixiPlugin from "vue3-pixi-components";

createApp(App).use(PixiPlugin).mount("#app");
