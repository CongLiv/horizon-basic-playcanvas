import { Cylinder } from "../model/cylinder";
import { SuperObject } from "../superObject";
import { Utils } from "../../../utils/utils";

export class SingleCylinder extends SuperObject {
  constructor() {
    super();
    this.tags.add("obstacle");
    this.objectWidth = 6;
  }

  _createObject() {
    let randHeight = Utils.getRandomInt(18, 25);
    let randRadius = Utils.getRandomInt(5, 6);

    this.cylinder = new Cylinder(randRadius, randHeight, randRadius);

    this.cylinder.setLocalPosition(0, randHeight / 2, 0);
    this.addChild(this.cylinder);
  }

  spawnToPosition(position, spawnContainer) {
    this.setLocalPosition(position);
    spawnContainer.addChild(this);
  }
}
