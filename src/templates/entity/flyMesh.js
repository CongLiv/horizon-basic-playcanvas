import { Entity } from "playcanvas";

export class FlyMesh extends Entity {
  constructor() {
    super();
    this.addComponent("script");

    this.script.create("ribbon", {
        attributes: {
            yoffset: 0.6,
            xoffset: -0.6,
            lifetime: 0.14
        }
    })
  }
}
