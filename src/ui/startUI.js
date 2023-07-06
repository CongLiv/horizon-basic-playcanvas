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

    

    this.header = new Entity();
    // this.header.addComponent("element", {
    //   type: "image",
    //   anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
    //   pivot: new pc.Vec2(0.5, 0.5),
    //   width: 150,
    //   height: 50,
    //   color: new pc.Color(0, 0, 0, 0),
    //   opacity: 0.2,
    // });
  

    this.header.addComponent("element", {
      type: "image",
      textureAsset: assets.logoTexture,
      anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
      pivot: new pc.Vec2(0.5, 0.5),
      width: 80,
      height: 20,
      opacity: 1,
    });

    

    this.screen.addChild(this.header);
    this.header.setLocalPosition(0, 15, 0);
    this.screen.addChild(this.header);

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
    this.startButton.script.create("startButtonScript");

    this.screen.addChild(this.startButton);

    
    this.addChild(this.screen);
  }
}
