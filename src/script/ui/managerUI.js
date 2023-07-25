
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

    managerUI.attributes.add('skinUI', {
        type: 'entity',
        title: 'Skin UI'
    });

    managerUI.prototype.initialize = function() {

        this.playingUI.enabled = false;
        this.startUI.enabled = true;
        this.endUI.enabled = false;
        this.skinUI.enabled = false;
        this._isStart = false;
        this._isEnd = false;
        this.app.on('managerUI:startGame', this._startGame, this);
        this.app.on('managerUI:endGame', this._endGame, this);
        this.app.on('managerUI:skinSelect', this._skinSelect, this);
        this.app.on('managerUI:backHome', this._backHome, this);
    };


    managerUI.prototype.update = function(dt) {
        
    };


    managerUI.prototype._startGame = function() {
        this._isStart = true;
        this.playingUI.enabled = true;
        this.startUI.enabled = false;
        this.endUI.enabled = false;
        this.skinUI.enabled = false;
    }

    managerUI.prototype._endGame = function() {
        this._isEnd = true;
        this.playingUI.enabled = false;
        this.startUI.enabled = false;
        this.endUI.enabled = true;
        this.skinUI.enabled = false;
    }

    

    managerUI.prototype._skinSelect = function() {
        this.skinUI.enabled = true;
        this.endUI.enabled = false;
        this.playingUI.enabled = false;
        this.startUI.enabled = false;
    }   

    managerUI.prototype._backHome = function() {
        this.skinUI.enabled = false;
        this.endUI.enabled = false;
        this.playingUI.enabled = false;
        this.startUI.enabled = true;
    }

}
