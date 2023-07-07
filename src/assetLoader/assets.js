import { Asset } from "playcanvas";

export const assets = {
    planeModel: new Asset("planeModel", "model", {url: "assets/models/plane.glb"}),

    flyAnim: new Asset("flyAnim", "animation", {url: "assets/anims/flying.glb"}),
    waverAnim: new Asset("waverAnim", "animation", {url: "assets/anims/waver.glb"}),

    groundTexture: new Asset("groundTexture", "texture", {url: "assets/textures/ground.png"}),
    sandTexture: new Asset("sandTexture", "texture", {url: "assets/textures/sand.jpg"}),
    rockTexture: new Asset("rockTexture", "texture", {url: "assets/textures/rock.jpg"}),
    logoTexture: new Asset("logoTexture", "texture", {url: "assets/textures/logostart3.png"}),
    headerTexture: new Asset("headerTexture", "texture", {url: "assets/textures/header.png"}),
    backgroundTexture: new Asset("backgroundTexture", "texture", {url: "assets/textures/background.png"}),
    backButtonTexture: new Asset("backButtonTexture", "texture", {url: "assets/textures/backbutton.png"}),
    playButtonTexture: new Asset("buttonTexture", "texture", {url: "assets/textures/playbutton.png"}),
    skinButtonTexture: new Asset("skinbuttonTexture", "texture", {url: "assets/textures/skinbutton.png"}),

    

    skybox1: new Asset("skybox1", "cubemap", {url: "assets/cubemaps/skybox1.png"}),


    font1: new Asset("font1", "font", {url: "assets/fonts/141347177/neuropol x rg.json"}),

};