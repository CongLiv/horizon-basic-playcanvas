

export function ScrollBarScript(){

    var scrollBarScript = pc.createScript("scrollBarScript");

    scrollBarScript.attributes.add("scrollTarget", {
        type: "entity",
        title: "Scroll Target",
    });



    scrollBarScript.prototype.initialize = function () {

    }

    scrollBarScript.prototype.update = function (dt) {

        let value = this.entity.scrollbar.value;
        
        this.scrollTarget.setLocalPosition(0, 30 * value, 0);
        

    }
}