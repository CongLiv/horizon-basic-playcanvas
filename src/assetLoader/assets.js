import { Asset } from "playcanvas";

export const assets = {
    planeModel: new Asset("planeModel", "model", {url: "assets/models/plane.glb"}),

    flyAnim: new Asset("flyAnim", "animation", {url: "assets/anims/flying.glb"}),
    waverAnim: new Asset("waverAnim", "animation", {url: "assets/anims/waver.glb"}),

    groundTexture: new Asset("groundTexture", "texture", {url: "assets/textures/ground.png"}),
    sandTexture: new Asset("sandTexture", "texture", {url: "assets/textures/sand.jpg"}),
    rockTexture: new Asset("rockTexture", "texture", {url: "assets/textures/rock.jpg"}),
    buttonTexture: new Asset("buttonTexture", "texture", {url: "assets/textures/playbutton.png"}),

    skybox1: new Asset("skybox1", "cubemap", {url: "assets/cubemaps/skybox1.png"}),


    font1: new Asset("font1", "font", {url: "assets/fonts/140859953/Trend HM Sans W00 One.json"}),

};