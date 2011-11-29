var Board = (function() {
    function Board(wallIds) {

        this.walls = [];
        for (var i in wallIds) {
            this.walls.push(new Wall(wallIds[i]));
        }
        this.stickyDialog = new StickyDialog();
    }

    Board.prototype.initialize = function() {
        for (var i in this.walls) {
            this.walls[i].registerAddStickyButtonListener('click', this.stickyDialog.display);
        }
    }

    return Board;
})();