import { Entity, LIGHTTYPE_DIRECTIONAL, Color} from 'playcanvas';


export class Light extends Entity {
  constructor() {
    super();
    this.addComponent("light", {
      type: "directional",
      color: new Color(1, 1, 1),
      castShadows: true,
      shadowBias: 0.2,
      shadowDistance: 120,
      normalOffsetBias: 0.05,
      shadowResolution: 1024,
      affectDynamic: true,
      shadowUpdateMode: pc.SHADOWUPDATE_REALTIME,
      shadowType: pc.SHADOW_PCF3,
    });
  
    this.setLocalPosition(0, 0, 0);
    this.setLocalEulerAngles(60, 135, 0);

    this.tags.add("light");

  }
}
