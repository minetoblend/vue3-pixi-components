import { camelize, createRenderer, warn } from "vue";
import {
  AnimatedSprite,
  BitmapText,
  Container,
  Graphics,
  Mesh,
  NineSlicePlane,
  SimpleMesh,
  SimplePlane,
  SimpleRope,
  Sprite,
  Text,
  TilingSprite,
} from "pixi.js";
import { patchPixiProp as patchProp } from "./patchProp";

interface CreatePixiRendererOptions {
  elementPrefix?: string;
}

const elementTypes = {
  Container,
  Sprite,
  Graphics,
  Text,
  BitmapText,
  TilingSprite,
  AnimatedSprite,
  Mesh,
  NineSlicePlane,
  SimpleMesh,
  SimplePlane,
  SimpleRope,
} as Record<string, new (...args: any) => Container>;

export function createPixiRenderer(options: CreatePixiRendererOptions = {}) {
  const { elementPrefix = "pixi" } = options;

  return createRenderer<Container, Container>({
    createElement: (name, isSVG, isCustomizedBuiltIn, vnodeProps) => {
      let ctor: undefined | (new (...args: any) => Container) = undefined;

      if (name.startsWith(elementPrefix)) {
        name = camelize(name);
        ctor = elementTypes[name.slice(elementPrefix.length)];

        // sprite
        // tiling sprite
      } else {
        name = camelize(name);
        name = name.charAt(0).toUpperCase() + name.slice(1);

        ctor = elementTypes[name];
      }

      if (ctor) {
        if (ctor === Graphics) return new ctor(vnodeProps?.geometry);
        if (ctor === Text)
          return new ctor(
            vnodeProps?.text,
            vnodeProps?.style,
            vnodeProps?.canvas
          );
        if (ctor === BitmapText)
          return new ctor(vnodeProps?.text, vnodeProps?.style);

        return new ctor();
      }

      warn("Unknown element " + name);

      return new Container();
    },
    patchProp,

    insert: (child, parent, anchor) => {
      if (anchor) {
        parent.addChildAt(child, parent.getChildIndex(anchor));
      } else {
        parent.addChild(child);
      }
    },
    remove: (child) => {
      child.destroy();
    },
    createText: (text) => {
      // foo
      return new Text(text);
    },
    createComment: () => {
      return new Container();
    },
    nextSibling: (node) => {
      const index = node.parent.getChildIndex(node);
      if (node.parent.children.length <= index + 1) return null;
      return (node.parent.getChildAt(index + 1) as Container) ?? null;
    },
    parentNode: (node) => {
      return node.parent;
    },
    setElementText: (node, text) => {
      if (node instanceof Text) node.text = text;
      else {
        warn(`Text is only supported with ${elementPrefix}-text element`);
      }
    },
    setText: (node, text) => {
      if (node instanceof Text) node.text = text;
    },
  });
}

export const { createApp: createPixiApp, render: renderPixi } =
  createPixiRenderer();
