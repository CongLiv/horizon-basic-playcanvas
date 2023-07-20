import { Utils } from "../../utils/utils";


export function MoveSphereScript(){

    var moveSphereScript = new pc.createScript('moveSphereScript');

    moveSphereScript.prototype.initialize = function() {
        
        this._moveDirection = Utils.getChance(0.5) ? 1 : -1;
        this._moveSpeed = 7.5;
    }

    moveSphereScript.prototype.update = function(dt) {
        this.entity.rigidbody.applyForce(this._moveDirection * this._moveSpeed, 0, 0);
    }
}