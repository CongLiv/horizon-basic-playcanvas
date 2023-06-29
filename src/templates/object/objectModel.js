import { Entity } from "playcanvas";

export class ObjectModel extends Entity {
    constructor() {
      super();
    }
  
    spawnToPosition(position) {}
    destroyModel() {
      let parent = this.getParent();
      parent.removeChild(this);
      this.destroy();
    }
  }