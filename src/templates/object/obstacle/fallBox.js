import { Utils } from "../../../utils/utils.js";
import { Box } from "../model/box.js";
import { SuperObject } from "../superObject.js";

export class FallBox extends SuperObject {
  constructor() {
    super();
    this.tags.add("obstacle");
    this.objectWidth = 40;
  }

  _createObject() {
    let direction = Utils.getChance(0.5) ? 1 : -1; // 1 for right, -1 for left
    for (let i = -20; i <= 20; i += 10) {
      let box = new Box(1.5, 20, 3);

      box.addComponent("script");
      box.script.create("fallBoxScript", {
        attributes: {
          direction: direction,
        },
      });
      this.addChild(box);
      box.setLocalPosition(i, 0, 0);
    }
  }

  spawnToPosition(position, spawnContainer) {
    this.setLocalPosition(position);
    spawnContainer.addChild(this);
  }
}
