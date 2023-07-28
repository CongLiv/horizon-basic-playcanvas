import { Game } from "../../../game";
import { Utils } from "../../../utils/utils";
import { Gem } from "../model/gem";
import { SuperObject } from "../superObject";

export class SetGem extends SuperObject {
  constructor() {
    super();
    this.tags.add("collectable");
    this.objectWidth = 2;
  }

  _createObject() {
    let ranGems = Utils.getRandomInt(1, 4);

    for (let i = 0; i < ranGems; i++) {
      let gem = new Gem();
      gem.addComponent("script");
      gem.script.create("gemScript");
      this.addChild(gem);
      gem.setLocalPosition(0, Game.player.flyHeight - 1, i * 4);
    }
  }

  spawnToPosition(position, spawnContainer) {
    this.setLocalPosition(position);
    spawnContainer.addChild(this);
  }
}
