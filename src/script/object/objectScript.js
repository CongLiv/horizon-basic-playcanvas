

export function ObjectScript(){


    var objectScript = new pc.createScript('objectScript');

    objectScript.attributes.add('player', {
        type: 'entity',
        title: 'Player'
    });

    objectScript.prototype.initialize = function() {
        this._destroyDistance = 30;
    }

    objectScript.prototype.update = function(dt) {

        // if object after player 300 unit, destroy object
        if(this.entity.getPosition().z < this.player.getPosition().z - this._destroyDistance){
            this.entity.destroyObject();
        }

    }
}