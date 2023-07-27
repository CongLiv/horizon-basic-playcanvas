import { Entity, asset } from "playcanvas";
import { CurveSet } from "playcanvas";
import { Curve } from "playcanvas";
import { assets } from "../../assetLoader/assets";

export class GemParticle extends Entity {
  constructor() {
    super();
    this._initParticle();
  }

  _initParticle() {
    this.particleEntity = new Entity();
    this.addChild(this.particleEntity);

    let texture = assets.gemTexture.resource;

    let velocityGraph = new CurveSet([
      [0, 5, 1, 5],
      [0, 5, 1, 5],
      [0, -3.375, 1, -3.375],
    ]);
    let velocityGraph2 = new CurveSet([
      [0, -5, 1, -5],
      [0, -5, 1, -5],
      [0, -3.375, 1, -3.375],
    ]);

    let scaleGraph = new Curve([0, 0.2, 0.7, 0.2, 0.9, 0.2]);

    let alphaGraph = new Curve([0, 0.9, 1, 0.5]);

    let radialSpeedGraph = new Curve([0, 99, 0.1, 5, 0.65, 3]);

    this.particleEntity.addComponent("particlesystem", {
      autoPlay: false,
      lifetime: 0.3,
      rate: 0,
      rate2: 0.01,
      startAngle: 0,
      startAngle: 0,
      numParticles: 70,
      loop: false,
      blend: pc.BLEND_ADDITIVE,
      intensity: 5,
      stretch: 0,
      emitterShape: pc.EMITTERSHAPE_BOX,
      velocityGraph: velocityGraph,
      velocityGraph2: velocityGraph2,
      scaleGraph: scaleGraph,
      alphaGraph: alphaGraph,
      colorMap: texture,
      radialSpeedGraph: radialSpeedGraph,
      localSpace: false,
    });

    this.particleEntity.setLocalScale(1, 1, 1);
    this.particleEntity.setLocalPosition(0, 0, 1);
  }

  play() {
    this.reset();
    this.particleEntity.particlesystem.play();
  }

  reset() {
    this.particleEntity.particlesystem.reset();
  }

  stop() {
    this.particleEntity.particlesystem.stop();
  }
}
