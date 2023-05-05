import { PixiSimpleRopeComponent } from "./simpleRope";
import { PixiSimplePlaneComponent } from "./simplePlane";
import { PixiNineSlicePlaneComponent } from "./nineSlicePlane";
import { PixiMeshComponent } from "./mesh";
import { PixiAnimatedSpriteComponent } from "./animatedSprite";
import { PixiTilingSpriteComponent } from "./tilingSprite";
import { PixiTextComponent } from "./text";
import { PixiGraphicsComponent } from "./graphics";
import { PixiContainerComponent } from "./container";
import "@vue/runtime-core";
import { PixiSpriteComponent } from "./sprite";
import { PixiBitmapTextComponent } from "./bitmapText";

export {};

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    Container: PixiContainerComponent;
    PixiContainer: PixiContainerComponent;

    Sprite: PixiSpriteComponent;
    PixiSprite: PixiSpriteComponent;

    Graphics: PixiGraphicsComponent;
    PixiGraphics: PixiGraphicsComponent;

    Text: PixiTextComponent;
    PixiText: PixiTextComponent;

    BitmapText: PixiBitmapTextComponent;
    PixiBitmapText: PixiBitmapTextComponent;

    TilingSprite: PixiTilingSpriteComponent;
    PixiTilingSprite: PixiTilingSpriteComponent;

    AnimatedSprite: PixiAnimatedSpriteComponent;
    PixiAnimatedSprite: PixiAnimatedSpriteComponent;

    Mesh: PixiMeshComponent;
    PixiMesh: PixiMeshComponent;

    SimplePlane: PixiSimplePlaneComponent;
    PixiSimplePlane: PixiSimplePlaneComponent;

    NineSlicePlane: PixiNineSlicePlaneComponent;
    PixiNineSlicePlane: PixiNineSlicePlaneComponent;

    SimpleRope: PixiSimpleRopeComponent;
    PixiSimpleRope: PixiSimpleRopeComponent;
  }
}
