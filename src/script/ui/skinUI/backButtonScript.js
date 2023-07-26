import { Game } from "../../../game";


export function BackButtonScript() {

    var backButtonScript = pc.createScript('backButtonScript');

    backButtonScript.prototype.initialize = function() {
        this.entity.element.on('click', this._onClick, this);
    }

    backButtonScript.prototype.update = function(dt) {

    }

    backButtonScript.prototype._onClick = function(event) {
        Game.Sound.play('click');
        this.app.fire('managerUI:backHome', true);
    }
}