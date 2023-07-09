import { Entity } from "playcanvas";
import { assets } from "../assetLoader/assets";
import { Game } from "../game.js";
import { Screen2D } from "../templates/ui/screen2D";
import { BackGround } from "../templates/ui/background";

export class SkinUI extends Entity {
  constructor() {
    super();
    this.screen = new Screen2D();
    this.addChild(this.screen);

    this.background = new BackGround();
    this.screen.addChild(this.background);
    
    // back button
    this.backButton = new Entity();
    this.screen.addChild(this.backButton);
    this.backButton.addComponent("element", {
      type: "image",
      textureAsset: assets.backButtonTexture,
      anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
      pivot: new pc.Vec2(0.5, 0.5),
      opacity: 1,
      useInput: true,
    });
    this.backButton.addComponent("script");
    this.backButton.script.create("backButtonScript");
    if (Game.isPortrait()) {
      this.backButton.element.width = 30;
      this.backButton.element.height = 12;
      this.backButton.setLocalPosition(0, -50, 0);
    } else {
      this.backButton.element.width = 20;
      this.backButton.element.height = 8;
      this.backButton.setLocalPosition(0, -25, 0);
    }

 
    // scrollbar

    // this.scrollbar = new Entity();
    // this.screen.addChild(this.scrollbar);
    // this.scrollbar.addComponent("element", {
    //   type: "image",
    //   anchor: new pc.Vec4(1, 1, 1, 1),
    //   pivot: new pc.Vec2(1, 1),
    //   margin: new pc.Vec4(-3, -72, 0, 0),
    //   color: new pc.Color(),
    //   opacity: 0.5,
    //   width: 3,
    //   height: 72,
    // });

    // this.handle = new Entity();
    // this.handle.addComponent("element", {
    //   type: "image",
    //   anchor: new pc.Vec4(0, 1, 1, 1),
    //   pivot: new pc.Vec2(1, 1),
    //   margin: new pc.Vec4(0, -36, 0, 0),
    //   color: new pc.Color(1, 1, 1, 1),
    //   opacity: 1,
    //   rect: new pc.Vec4(0, 0, 1, 1),
    //   useInput: true,
    // });

    // this.handle.addComponent("button", {
    //   active: true,
    //   imageEntity: this.handle,
    //   hitPadding: new pc.Vec4(0, 0, 0, 0),
    //   transitionMode: pc.BUTTON_TRANSITION_MODE_TINT,
    //   hoverTint: new pc.Color(1, 1, 1),
    //   pressedTint: new pc.Color(1, 1, 0.5),
    //   inactiveTint: new pc.Color(1, 1, 1),
    //   fadeDuration: 0,
    // });
    // this.scrollbar.addChild(this.handle);
    // this.scrollbar.addComponent("scrollbar", {
    //   orientation: pc.ORIENTATION_VERTICAL,
    //   value: 0,
    //   handleSize: 0.5,
    //   handleEntity: this.handle,
    // });


    


  }
}
