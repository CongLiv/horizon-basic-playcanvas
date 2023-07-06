
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

    managerUI.attributes.add('endUI',{
        type: 'entity',
        title: 'End UI'
    });

    managerUI.prototype.initialize = function() {

        this.playingUI.enabled = false;
        this.startUI.enabled = true;
        this.endUI.enabled = false;
        this._isStart = false;
        this._isEnd = false;
        this.app.on('managerUI:startGame', this._startGame, this);
        this.app.on('managerUI:endGame', this._endGame, this);
    };


    managerUI.prototype.update = function(dt) {
        
    };


    managerUI.prototype._startGame = function() {
        this._isStart = true;
        this.playingUI.enabled = true;
        this.startUI.enabled = false;
        this.endUI.enabled = false;
    }

    managerUI.prototype._endGame = function() {
        this._isEnd = true;
        this.playingUI.enabled = false;
        this.startUI.enabled = false;
        this.endUI.enabled = true;
    }
}