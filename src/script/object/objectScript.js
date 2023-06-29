

export function ObjectScript(){


    let objectScript = new pc.createScript('objectScript');

    objectScript.attributes.add('player', {
        type: 'entity',
        title: 'Player'
    });

    objectScript.prototype.initialize = function() {

    }

    objectScript.prototype.update = function(dt) {
        // if object after player 20 unit, destroy object
        if(this.entity.getPosition().z < this.player.getPosition().z - 5){
            this.entity.destroyObject();
        }

    }
}