import { Entity } from "playcanvas";


export class Scene extends Entity {
  constructor(key) {
    super(key);
    this.key = key;
    // this.ui = new Entity();
    // this.addChild(this.ui);
  }

  create() {
    console.log(`${this.key }Scene`);
  }

  update(dt) {
    // this.ui.update();
  }

  resize() {
    // this.ui.resize();
  }

  pause() {
    // this.ui.pause();
  }

  resume() {
    // this.ui.resume();
  }

  destroy() {
    super.destroy();
  }
}
