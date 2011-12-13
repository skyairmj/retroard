var Section = (function() {

    function Section(name) {
        var that = this;
        this.dom = $('#' + name);
        this.addStickyButton = this.dom.find('.addStickyButton');
        this.name = name;
        this.stickies = [];
        this.addStickyButton.on('click', function() {
            that.addSticky();
        });
        this.onStickyRemove = function() {
            if(that.stickies.length == 1) {
                that.stickies = [];
            }
            else {
                for(var index in that.stickies) {
                    if(that.stickies[index] == this) {
                        that.stickies.slice(index, 1);
                    }
                }
            }
        }
    }

    Section.prototype.addSticky = function() {
        var newSticky = new Sticky(this.onStickyRemove);
        this.stickies.push(newSticky);
        this.dom.find('.sectionBody').append(newSticky.dom);
        return newSticky;
    }

    return Section;
})();