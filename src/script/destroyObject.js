

export function DestroyObject(){

    let destroyObject = new pc.createScript('destroyObject');


    destroyObject.attributes.add('player', {
        type: 'entity',
        title: 'Player'
    });

    destroyObject.prototype.initialize = function() {
        this.entity.setLocalPosition(this.player.getPosition().x, 0, this.player.getPosition().z - 150);
    };

    destroyObject.prototype.update = function(dt) {
        // move forward following player
        this.entity.setPosition(this.player.getPosition().x, 0, this.player.getPosition().z - 150);
    };
}