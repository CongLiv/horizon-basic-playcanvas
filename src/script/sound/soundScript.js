export function SoundScript(){

    var soundScript = new pc.createScript("soundScript");

    soundScript.prototype.initialize = function () {
        this._resetGemSoundCounter = 0;
        this._resetGemSoundDuration = 1;
    }

    soundScript.prototype.update = function (dt) {
        if (this.entity.currentGemSound == 6){
            this._resetGemSoundCounter += dt;
            if (this._resetGemSoundCounter >= this._resetGemSoundDuration){
                this.entity.currentGemSound = 1;
                this._resetGemSoundCounter = 0;
            }
        }
    }
}