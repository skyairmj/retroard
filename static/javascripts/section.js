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
    }

    Section.prototype.addSticky = function() {
        var newSticky = new Sticky();
        this.stickies.push(newSticky);
        this.dom.find('.sectionBody').append(newSticky.dom);
        return newSticky;
    }

    return Section;
})();