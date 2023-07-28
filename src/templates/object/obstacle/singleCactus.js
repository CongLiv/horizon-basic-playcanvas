import { assets } from "../../../assetLoader/assets";
import { Utils } from "../../../utils/utils";
import { Cactus } from "../model/cactus";
import { Tree } from "../model/tree";
import { SuperObject } from "../superObject";

export class SingleCactus extends SuperObject {
  constructor() {
    super();
    this.tags.add("obstacle");
    this.objectWidth = 4;
  }

  _createObject() {
    this.cactus = new Cactus();
    this.addChild(this.cactus);
    let randAngle = Utils.getRandomInt(0, 180);
    this.cactus.setLocalEulerAngles(0, randAngle, 0);
    this.cactus.setLocalPosition(0, 3.4, 0);
  }

  spawnToPosition(position, spawnContainer) {
    this.setLocalPosition(position);
    spawnContainer.addChild(this);
  }
}
