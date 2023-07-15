

export function ObjectScript(){


    var objectScript = new pc.createScript('objectScript');

    objectScript.attributes.add('player', {
        type: 'entity',
        title: 'Player'
    });

    objectScript.prototype.initialize = function() {

    }

    objectScript.prototype.update = function(dt) {

        // if object after player 100 unit, destroy object
        if(this.entity.getPosition().z < this.player.getPosition().z - 300){
            this.entity.destroyObject();
        }

    }
}