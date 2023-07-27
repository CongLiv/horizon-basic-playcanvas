import { SuperObject } from "../superObject.js";
import { Box } from "../model/box.js";

export class AdjoinBox extends SuperObject {
  constructor() {
    super();
    this.tags.add("obstacle");
    this.objectWidth = 10;
  }

  _createObject() {
    let boxHeight = 10;
    for (let i = -10; i <= 10; i += 10) {
      let box = new Box(10, boxHeight, 4);
      box.setLocalPosition(0, 0, i);
      this.addChild(box);
    }
  }

  spawnToPosition(position, spawnContainer) {
    this.setLocalPosition(position);
    spawnContainer.addChild(this);
  }
}
