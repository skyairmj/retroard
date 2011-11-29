var Section = (function() {
    function Section(sectionId) {
        this.dom = $('#' + sectionId);
        this.addStickyButton = $('.addStickyButton');
    }

    Section.prototype.registerAddStickyButtonListener = function(event, listener) {
        this.addStickyButton.on(event, listener);
    }

    return Section;
})();