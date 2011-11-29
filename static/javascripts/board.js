var Board = (function() {
    function Board(sectionIds) {

        this.sections = [];
        for (var i in sectionIds) {
            this.sections.push(new Section(sectionIds[i]));
        }
        this.stickyDialog = new StickyDialog();
    }

    Board.prototype.initialize = function() {
        for (var i in this.sections) {
            this.sections[i].registerAddStickyButtonListener('click', this.stickyDialog.display);
        }
    }

    return Board;
})();