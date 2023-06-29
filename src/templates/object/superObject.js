import { Entity } from "playcanvas";
import { ObjectScript } from "../../script/object/objectScript";

export class SuperObject extends Entity {
  constructor(player) {
    super();
    this.player = player;
  }

  spawnToPosition(position) {}
  destroyObject() {
    let parent = this.getParent();
    parent.removeChild(this);
    this.destroy();
  }

  addObjectScript() {
    ObjectScript();
    this.addComponent("script");
    this.script.create("objectScript", {
      attributes: {
        player: this.player,
      },
    });
  }
}
