import { Entity } from "playcanvas";
import { ObjectScript } from "../../script/object/objectScript";
import { Game } from "../../game";

export class SuperObject extends Entity {
  constructor() {
    super();
    this._addObjectScript();
  }

  spawnToPosition(position, spawnContainer) {}
  

  destroyObject() {
    let parent = this.getParent();
    parent.removeChild(this);
    this.destroy();
  }

  _createObject() {}
  _addObjectScript() {
    
    this.addComponent("script");
    this.script.create("objectScript", {
      attributes: {
        player: Game.player,
      },
    });
  }
}
