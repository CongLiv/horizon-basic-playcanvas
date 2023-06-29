export function SpawnObject(){


    let spawnObject = new pc.createScript('spawnObject');

    spawnObject.attributes.add('player', {
        type: 'entity',
        title: 'Player'
    });
    spawnObject.prototype.initialize = function() {
        this.entity.setLocalPosition(this.player.getPosition().x, 0, this.player.getPosition().z + 150);
    };

    spawnObject.prototype.update = function(dt) {
        // move forward following player
        this.entity.setPosition(this.player.getPosition().x, 0, this.player.getPosition().z + 150);
    };

}