

export function ObjectScript(){


    let objectScript = new pc.createScript('objectScript');

    objectScript.attributes.add('player', {
        type: 'entity',
        title: 'Player'
    });

    objectScript.prototype.initialize = function() {
        console.log(this.entity)
        console.log('objectScript initialize');
    }

    objectScript.prototype.update = function(dt) {
        // if object after player 20 unit, destroy object
        if(this.entity.getPosition().z < this.player.getPosition().z - 20){
            this.entity.destroyObject();
        }

    }
}