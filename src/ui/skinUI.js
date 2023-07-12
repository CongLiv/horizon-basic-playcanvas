import { Entity, Vec2 } from "playcanvas";
import { assets } from "../assetLoader/assets";
import { Game } from "../game.js";
import { Screen2D } from "../templates/ui/screen2D";
import { BackGround } from "../templates/ui/background";
import { ScrollBar } from "../templates/ui/scrollbar";
import { ScrollView } from "../templates/ui/scrollview";

export class SkinUI extends Entity {
  constructor() {
    super();
    this.screen = new Screen2D();
    this.addChild(this.screen);

    this.background = new BackGround();
    this.screen.addChild(this.background);

    //scrollview

    this.scrollview = new ScrollView();
    this.screen.addChild(this.scrollview);
    this.scrollview.setLocalPosition(0, 0, 0);

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
  }
}
