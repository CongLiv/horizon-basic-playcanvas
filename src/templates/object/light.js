import { Entity, LIGHTTYPE_DIRECTIONAL, Color} from 'playcanvas';


export class Light extends Entity {
  constructor() {
    super();
    this.addComponent("light", {
      type: LIGHTTYPE_DIRECTIONAL,
      color: new Color(1, 1, 1),
      castShadows: true,
      shadowBias: 0.2,
      shadowDistance: 10,
      normalOffsetBias: 0.05,
      shadowResolution: 2048,
    });
  
    this.setLocalPosition(0, 0, 0);
    this.setLocalEulerAngles(45, 135, 0);
    this.tags.add("light");

  }
}
