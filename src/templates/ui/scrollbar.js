import { Entity } from "playcanvas";
import { Game } from "../../game.js";
export class ScrollBar extends Entity {
  constructor() {
    super();

    this.addComponent("element", {          // background handle
      type: "image",
      anchor: new pc.Vec4(1, 0, 1, 1),
      pivot: new pc.Vec2(1, 1),
      margin: new pc.Vec4(-3, -10, 0, 0),
      color: new pc.Color(),
      opacity: 0.5,
      width: 3,
      height: 60,
    });

    // if (Game.isPortrait()) {
    //   this.element.height = 100;
    // }
    // this handle is scroll button
    this.handle = new Entity();
    this.handle.addComponent("element", {
      type: "image",
      anchor: new pc.Vec4(0, 1, 1, 1),
      pivot: new pc.Vec2(1, 1),
      margin: new pc.Vec4(0, -36, 0, 0),
      color: new pc.Color(1, 1, 1, 1),
      opacity: 1,
      rect: new pc.Vec4(0, 0, 1, 1),
      useInput: true,
    });

    this.handle.addComponent("button", {
      active: true,
      imageEntity: this.handle,
      hitPadding: new pc.Vec4(0, 0, 0, 0),
      transitionMode: pc.BUTTON_TRANSITION_MODE_TINT,
      hoverTint: new pc.Color(1, 1, 1),
      pressedTint: new pc.Color(1, 1, 0.5),
      inactiveTint: new pc.Color(1, 1, 1),
      fadeDuration: 0,
    });

    this.addChild(this.handle);
    
    this.addComponent("scrollbar", {
      orientation: pc.ORIENTATION_VERTICAL,
      value: 0,
      handleSize: 0.5,
      handleEntity: this.handle,
    });

  }
}
