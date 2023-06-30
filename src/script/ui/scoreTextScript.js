
export function ScoreTextScript() {


    var scoreTextScript = pc.createScript('scoreTextScript');

    scoreTextScript.attributes.add('player', {
        type: 'entity',
        title: 'Player'
    });


    scoreTextScript.prototype.initialize = function() {
        this.entity.element.text = '0';
    };


    scoreTextScript.prototype.update = function(dt) {
        this.entity.element.text = Math.floor(this.player.getPosition().z / 10);
    };

}
