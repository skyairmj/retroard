var Board = (function() {
    function Board(sectionIds) {

        this.sections = [];
        for (var i in sectionIds) {
            this.sections.push(new Section(sectionIds[i]));
        }
        this.stickyDialog = new StickyDialog();
        this.history = new History();
    }

    Board.prototype.initialize = function() {
        this.history.initialize();
        this.stickyDialog.initialize();
    }

    return Board;
})();