var Section = (function() {

    function Section(name) {
        var that = this;
        this.dom = $('#' + name);
        this.addStickyButton = this.dom.find('.addStickyButton');
        this.name = name;
        this.stickies = {};
        this.stickiesLength = 0;
        this.addStickyButton.on('click', function() {
            that.addSticky();
        });
        this.onStickyRemove = function() {
            delete that.stickies[this.uuid];
            that.stickiesLength--;
        }
    }

    Section.prototype.addSticky = function(uuid) {
        var uuid = uuid ? uuid : Utilities.generateUUID();
        var newSticky = new Sticky(this.onStickyRemove, uuid);
        this.stickies[uuid] = newSticky;
        this.stickiesLength++;
        this.dom.find('.sectionBody').append(newSticky.dom);
        return newSticky;
    }

    Section.prototype.updateSticky = function(data) {
        var newSticky = this.getSticky(data.uuid);
        if (!newSticky) {
            newSticky = this.addSticky(data.uuid);
        }
        newSticky.update(data);
        return newSticky;
    }

    Section.prototype.getSticky = function(uuid) {
        return this.stickies[uuid];
    }

    return Section;
})();