import { Entity, Vec2 } from "playcanvas";
import { assets } from "../assetLoader/assets";
import { Game } from "../game.js";
import { Screen2D } from "../templates/ui/screen2D";
import { BackGround } from "../templates/ui/background";
import { ScrollBar } from "../templates/ui/scrollbar";
import { ScrollView } from "../templates/ui/scrollview";
import { SkinPattern } from "../templates/ui/skinpattern";
import { Text } from "../templates/ui/text";

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


    this.footer = new SkinPattern();
    this.scrollview.viewPort.addChild(this.footer);
    this.footer.setLocalPosition(0, -65, 0);
    this.footer.setLocalScale(0.2, -0.2, 0.2);

    if (!Game.isPortrait()) {
      this.footer.enabled = false;
    }

    this.header = new Entity();
    this.scrollview.viewPort.addChild(this.header);

    this.headerpattern = new SkinPattern();
    this.header.addChild(this.headerpattern);
    this.headerpattern.setLocalPosition(0, 65, 0);
    this.headerpattern.setLocalScale(0.2, 0.2, 0.2);
    this.headerpattern.element.margin = new pc.Vec4(-400, -36.5, -400, -166.5);

    this.headerText = new Text("Ships", 40);
    this.header.addChild(this.headerText);
    this.headerText.setLocalPosition(0, 55, 0);
    this.headerText.setLocalScale(0.2, 0.2, 0.2);
    this.headerText.element.margin = new pc.Vec4(-53.808, 39.096, -53.808, -70.904);  
    
    if (!Game.isPortrait()) {
      this.headerpattern.setLocalScale(1, 0.1, 0.1);
      this.headerpattern.setLocalPosition(0, 35, 0);
      this.headerText.setLocalPosition(0, 30, 0);
      this.headerText.element.fontSize = 20;
    }
  
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
