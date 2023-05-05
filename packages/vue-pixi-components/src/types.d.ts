import { Texture } from "pixi.js";

declare module '*?texture' {
  const texture: Texture;
  export default texture;
}
