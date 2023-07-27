import { SuperObject } from "../superObject.js";

import { Box } from "../model/box.js";
import { Cylinder } from "../model/cylinder.js";

export class RotateBox extends SuperObject {
  constructor() {
    super();
    this.tags.add("obstacle");
    this.objectWidth = 10;
  }

  _createObject() {
    let cylinder = new Cylinder(2, 4, 2);
    cylinder.rigidbody.angularFactor = new pc.Vec3(0, 0, 0);
    cylinder.rigidbody.linearFactor = new pc.Vec3(0, 0, 0);

    this.addChild(cylinder);
    cylinder.setLocalPosition(0, 2, 0);

    let box = new Box(12, 2, 2);
    box.rigidbody.angularFactor = new pc.Vec3(0, 0, 0);
    box.rigidbody.linearFactor = new pc.Vec3(0, 0, 0);
    this.addChild(box);
    box.addComponent("script");
    box.script.create("rotateBoxScript");
    box.setLocalPosition(0, 5, 0);
  }

  spawnToPosition(position, spawnContainer) {
    this.setLocalPosition(position);
    spawnContainer.addChild(this);
  }
}
