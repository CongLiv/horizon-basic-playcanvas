export function StartButtonScript() {
  var startButtonScript = pc.createScript("startButtonScript");

  startButtonScript.prototype.initialize = function () {
    this.entity.element.on("click", this._onClick, this);
  };

  startButtonScript.prototype.update = function (dt) {};

  startButtonScript.prototype._onClick = function (event) {
    this.app.fire("planeControl:startGame", true)
    this.app.fire("cameraFollow:startGame", true)
    this.app.fire("spawnObject:startGame", true)
    this.app.fire("managerUI:startGame", true)
  };
}
