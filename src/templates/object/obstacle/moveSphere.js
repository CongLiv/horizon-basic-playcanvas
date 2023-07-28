import { Sphere } from "../model/sphere";
import { SuperObject } from "../superObject";

export class MoveSphere extends SuperObject {
  constructor() {
    super();
    this.tags.add("obstacle");
    this.objectWidth = 8;
  }

  _createObject() {
    this.sphere = new Sphere(8, 8, 8);

    this.sphere.addComponent("script");
    this.sphere.script.create("moveSphereScript");

    this.addChild(this.sphere);
    this.sphere.setLocalPosition(0, 0, 0);
  }

  spawnToPosition(position, spawnContainer) {
    this.setLocalPosition(position);
    spawnContainer.addChild(this);
  }
}
