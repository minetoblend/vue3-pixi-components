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
  texture: string | PIXI.Texture
  verticesX?: number
  verticesY?: number
  
  shader?: PIXI.Shader | PIXI.MeshMaterial;
  blendMode?: PIXI.BLEND_MODES
  drawMode?: PIXI.DRAW_MODES
  material?: PIXI.Shader
  roundPixels?: boolean
  size?: number
  start?: number
  state?: PIXI.State
  
  tint?: PIXI.ColorSource
  canvasPadding?: number

  autoResize?: boolean
};

type Events = PixiEvents;

export type PixiSimplePlaneComponent = DefineComponent<
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
