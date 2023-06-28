import { Asset } from "playcanvas";

export const assets = {
    planeModel: new Asset("planeModel", "model", {url: "assets/models/plane.glb"}),

    flyAnim: new Asset("flyAnim", "animation", {url: "assets/anims/flying.glb"}),
    waverAnim: new Asset("waverAnim", "animation", {url: "assets/anims/waver.glb"}),

    groundTexture: new Asset("groundTexture", "texture", {url: "assets/textures/ground.png"}),

    skybox1: new Asset("skybox1", "texture", {url: "assets/cubemaps/skybox1.png"}),

};