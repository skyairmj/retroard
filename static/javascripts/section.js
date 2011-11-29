var Section = (function() {
    function Section(type) {
//        this.dom = $('#' + sectionId);
        this.addStickyButton = $('.addStickyButton');
        this.type = type;
        this.stickies = [];
        this.addStickyButton.on('click', function() {
            this.addSticky();
        });
    }

    Section.prototype.addSticky = function() {
        var newSticky = new Sticky();
        this.stickies.push(newSticky);
        return newSticky;
    }

    Section.prototype.registerAddStickyButtonListener = function(event, listener) {
        this.addStickyButton.on(event, listener);
    }

    return Section;
})();