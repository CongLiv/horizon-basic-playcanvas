
export function ManagerUI() {


    var managerUI = pc.createScript('managerUI');

    managerUI.attributes.add('playingUI',{
        type: 'entity',
        title: 'Playing UI'
    });

    managerUI.attributes.add('startUI',{
        type: 'entity',
        title: 'Start UI'
    });

    managerUI.prototype.initialize = function() {

        this.playingUI.enabled = false;
        this.startUI.enabled = true;
        this._isStart = false;
        this.app.on('managerUI:startGame', this._startGame, this);
    };


    managerUI.prototype.update = function(dt) {
        
    };


    managerUI.prototype._startGame = function() {
        this._isStart = true;
        this.playingUI.enabled = true;
        this.startUI.enabled = false;
    }
}
