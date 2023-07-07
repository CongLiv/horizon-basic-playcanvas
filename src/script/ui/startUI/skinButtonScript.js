

export function SkinButtonScript() {

    var skinButtonScript = pc.createScript('skinButtonScript');

    skinButtonScript.prototype.initialize = function() {
        this.entity.element.on('click', this._onClick, this);
    }

    skinButtonScript.prototype.update = function(dt) {

    }

    skinButtonScript.prototype._onClick = function(event) {
        this.app.fire('managerUI:skinSelect', true);
    }
}