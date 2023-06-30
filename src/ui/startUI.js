import { Entity } from "playcanvas";
import { assets } from "../assetLoader/assets";

export class StartUI extends Entity {
  constructor() {
    super();
    this.screen = new Entity();
    this.screen.addComponent("screen", {
      screenSpace: true,
      scaleMode: "blend",
      referenceResolution: new pc.Vec2(128, 72),
      scaleBlend: 0.5,
      scaleToWindow: true,
      useRenderResolution: false,
      maxScale: 1,
      minScale: 0.5,
      renderMode: "blend",
      resolutionScale: 1,
      screenSpaceScaleMode: "blend",
    });

    this.background = new Entity();

    this.background.addComponent("element", {
      type: "image",
      anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
      pivot: new pc.Vec2(0.5, 0.5),
      width: 1280,
      height: 720,
      color: new pc.Color(0, 0, 0, 0),
      opacity: 0.2,
    });
    this.screen.addChild(this.background);

    

    this.titleText = new Entity();

    this.titleText.addComponent("element", {
      type: "text",
      text: "Infinite Flight",
      fontSize: 10,
      fontAsset: assets.font1,
      color: new pc.Color(1, 1, 0.8, 1),
      anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
      pivot: new pc.Vec2(0.5, 0.5),
      outlineColor: new pc.Color(0, 0, 0, 1),
      outlineThickness: 0.5,
      shadowColor: new pc.Color(0, 0, 0, 0.5),
      shadowOffset: new pc.Vec2(0.245, 0.15),
      useInput: true,
    });
    // set text to be centered on the screen
    this.titleText.setLocalPosition(0, 15, 0);
    this.screen.addChild(this.titleText);

    this.startButton = new Entity();
    this.startButton.addComponent("element", {
      type: "image",
      textureAsset: assets.buttonTexture,
      anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
      pivot: new pc.Vec2(0.5, 0.5),
      width: 20,
      height: 20,
      useInput: true,
    });
    this.startButton.setLocalPosition(0, -10, 0);
    this.startButton.addComponent('script');

    this.screen.addChild(this.startButton);

    this.addChild(this.screen);
  }
}
