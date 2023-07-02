

export function SceneManagerScript(){
    var sceneManagerScript = new pc.createScript("sceneManagerScript");

    sceneManagerScript.attributes.add("player", {
        type: "entity",
        title: "Player",
    });

    sceneManagerScript.prototype.initialize = function () {

    };

    sceneManagerScript.prototype.update = function (dt) {
    };

    sceneManagerScript.prototype._restartGame = function () {

    };
}