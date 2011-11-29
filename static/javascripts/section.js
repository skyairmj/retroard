var Section = (function() {
    var that;

    function Section(name) {
        that = this;
        this.dom = $('#' + name);
        this.addStickyButton = $('.addStickyButton');
        this.name = name;
        this.stickies = [];
        this.addStickyButton.on('click', function() {
            that.addSticky();
        });
    }

    Section.prototype.addSticky = function() {
        var newSticky = new Sticky();
        this.stickies.push(newSticky);
        return newSticky;
    }

    return Section;
})();