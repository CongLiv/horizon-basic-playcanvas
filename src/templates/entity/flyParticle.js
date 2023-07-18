import { Entity, asset } from "playcanvas";
import { CurveSet } from "playcanvas";
import { Curve } from "playcanvas";

export class FlyParticle extends Entity {
  constructor() {
    super();
    this._initParticle();
  }

  _initParticle() {
    this.particleEntity = new Entity();
    this.addChild(this.particleEntity);

    let velocityGraph = new CurveSet([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 1, -2],
    ]);

    let scaleGraph = new Curve([
      0, 0.5,
      1, 0.5,
    ]);

    let alphaGraph = new Curve([
      0, 1,
      0, 1,
      0, 1,
    ]);

    this.particleEntity.addComponent("particlesystem", {
      autoPlay: false,
      lifetime: 2,
      rate: 0.1,
      rate2: 0.2,
      startAngle: 0,
      startAngle: 0,
      numParticles: 30,
      loop: true,
      intensity: 100,
      blend: pc.BLEND_NORMAL,
      stretch: 5,
      emitterShape: pc.EMITTERSHAPE_SPHERE,
      velocityGraph: velocityGraph,
      velocityGraph2: velocityGraph,
      scaleGraph: scaleGraph,
      alphaGraph: alphaGraph,
      alignToMotion: true,
    });
    this.particleEntity.setLocalScale(1, 1, 1);
    this.particleEntity.setLocalPosition(0, -0.5, -0.5)
  }

  play() {
    this.particleEntity.particlesystem.play();
  }
}
