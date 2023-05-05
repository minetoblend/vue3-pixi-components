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
  width?: number;
  height?: number;

  anchor?: PIXI.IPointData | number;
  anchorX?: number;
  anchorY?: number;

  blendMode?: PIXI.BLEND_MODES;

  pluginName?: string;

  tint?: PIXI.ColorSource;

  clampMargin?: number;

  tilePosition?: PIXI.IPointData;
  tileScale?: PIXI.IPointData;
  tileTransform?: PIXI.Transform;

  uvMatrix?: PIXI.TextureMatrix;
  uvRespectAnchor?: boolean;
};

type Events = PixiEvents;

export type PixiTilingSpriteComponent = DefineComponent<
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
