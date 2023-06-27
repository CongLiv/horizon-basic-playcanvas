import { GameConstant } from "../gameConstant";
import { Scene } from "../templates/scene/scene";
import { Entity, LIGHTTYPE_DIRECTIONAL, Color } from "playcanvas";
import { Plane1 } from "../templates/entity/plane1";
import { MainCamera } from "../templates/camera/mainCamera";

export class PlayScene extends Scene {
  constructor() {
    super(GameConstant.SCENE_PLAY);
    this._initialize();
  }

  create() {
    super.create();
  }

  update(dt) {
    super.update(dt);
  }

  _initialize() {
    this._initLight();
    this._initModel();
    if (GameConstant.DEBUG_CAMERA) {
      this._initOrbitCamera();
    } else {
      this._initCamera();
    }
  }

  _initLight() {
    this.directionalLight = new Entity("light-directional");
    this.addChild(this.directionalLight);

    this.directionalLight.addComponent("light", {
      type: LIGHTTYPE_DIRECTIONAL,
      color: new Color(1, 1, 1),
      castShadows: true,
      shadowBias: 0.2,
      shadowDistance: 10,
      normalOffsetBias: 0.05,
      shadowResolution: 2048,
    });
    this.directionalLight.setLocalPosition(2, 30, -2);
    this.directionalLight.setLocalEulerAngles(45, 135, 0);
    this.addChild(this.directionalLight);
  }

  _initOrbitCamera() {
    this.camera = new Entity();
    this.camera.addComponent("camera", {
      clearColor: new Color(0.5, 0.5, 0.8),
      farClip: 1000,
    });

    this.camera.addComponent("script");
    this.camera.script.create("orbitCamera", {
      attributes: {
        inertiaFactor: 0.2,
        focusEntity: null,
        distanceMin: 0.5,
        distanceMax: Infinity,
        pitchAngleMin: -90,
        pitchAngleMax: 90,
        frameOnStart: true,
      },
    });
    this.camera.script.create("orbitCameraInputMouse");
    this.camera.script.create("orbitCameraInputTouch");

    this.addChild(this.camera);
  }
  _initCamera() {
    this.mainCamera = new MainCamera(this.plane);
    this.addChild(this.mainCamera);
  }

  _initModel() {
    // ground
    this.ground = new Entity();
    this.ground.addComponent("model", {
      type: "plane",
    });
    this.ground.setLocalScale(100, 1, 100);
    this.ground.setLocalPosition(0, 0, 0);
    this.addChild(this.ground);

    this.ground.addComponent("collision", {
      type: "box",
      halfExtents: new pc.Vec3(50, 0.5, 50),
    });
    this.ground.addComponent("rigidbody", {
      type: "static",
    });

    // plane
    this.plane = new Plane1();
    this.addChild(this.plane);
  }

  update(dt) {
    super.update(dt);
  }
}
