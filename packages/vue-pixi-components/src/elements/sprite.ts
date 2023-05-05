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
  texture: string | PIXI.Texture;

  anchor?: PIXI.IPointData | number;
  anchorX?: number;
  anchorY?: number;

  blendMode?: PIXI.BLEND_MODES;

  width?: number;
  height?: number;

  pluginName?: string;

  tint?: PIXI.ColorSource;
};

type Events = PixiEvents;

export type PixiSpriteComponent = DefineComponent<
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
