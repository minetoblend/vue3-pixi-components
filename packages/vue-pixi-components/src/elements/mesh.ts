import {
  DefineComponent,
  ComponentOptionsMixin,
  VNodeProps,
  ComponentCustomProps,
} from "vue";
import { AllowedPixiProps } from "./props";
import { PixiEvents } from "./events";
import * as PIXI from "pixi.js";

type Props = {
  geometry: PIXI.Geometry;
  shader: PIXI.Shader | PIXI.MeshMaterial;
  blendMode?: PIXI.BLEND_MODES
  drawMode?: PIXI.DRAW_MODES
  material?: PIXI.Shader
  roundPixels?: boolean
  size?: number
  start?: number
  state?: PIXI.State
  texture?: string | PIXI.Texture
  tint?: PIXI.ColorSource
  canvasPadding?: number
};

type Events = PixiEvents;

export type PixiMeshComponent = DefineComponent<
  Props,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Events)[],
  keyof Events,
  VNodeProps & AllowedPixiProps & ComponentCustomProps,
  Readonly<Props> & {
    [key in keyof Events as `on${Capitalize<key>}`]?:
      | ((...args: Events[key]) => any)
      | undefined;
  },
  {}
>;
