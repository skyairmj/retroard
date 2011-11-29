var Wall = (function() {
    function Wall(wallId) {
        this.dom = $('#' + wallId);
        this.addStickyButton = $('.addStickyButton');
    }

    Wall.prototype.registerAddStickyButtonListener = function(event, listener) {
        this.addStickyButton.on(event, listener);
    }

    return Wall;
})();