import { Utils } from "../../utils/utils.js";

export function RotateBoxScript() {
    
    var rotateBoxScript = new pc.createScript("rotateBoxScript");

    rotateBoxScript.prototype.initialize = function () {
        let randomInitAngle = Utils.getRandomInt(0, 360);
        this.entity.setLocalEulerAngles(0, randomInitAngle, 0);

        this.angle = 0; // Initialize the rotation angle
        this.rotationSpeed = 80; // Adjust the rotation speed (degrees per second)
    }

    rotateBoxScript.prototype.update = function (dt) {
        this.angle += this.rotationSpeed * dt; // Gradually increase the rotation angle
        this.entity.setLocalEulerAngles(0, this.angle, 0); // Apply the new rotation
        this.entity.collision.angularOffset = new pc.Quat(0, this.angle, 0)
    }
}