describe('board', function() {

    var board;
    var wellId = 'well';
    var lessWellId = 'lessWell';
    var puzzleId = 'puzzle';
    var ideaId = 'idea';
    beforeEach(function() {
        loadFixtures('board.html');
        board = new Board([wellId, lessWellId, puzzleId, ideaId]);
    });

    describe('initialize', function() {
        it('should create sections of well, less well, puzzle, idea', function() {

            expect(board.getSection(wellId).dom).toBe($('#' + wellId));
            expect(board.getSection(lessWellId).dom).toBe($('#' + lessWellId));
            expect(board.getSection(puzzleId).dom).toBe($('#' + puzzleId));
            expect(board.getSection(ideaId).dom).toBe($('#' + ideaId));
        });

        it('should initialize history', function() {
            var history = board.history;
            spyOn(history, 'initialize');
            board.initialize();

            expect(history.initialize).toHaveBeenCalled();
        });

        it('should initialize sticky dialog', function() {
            spyOn(StickyDialog, 'initialize');
            board.initialize();

            expect(StickyDialog.initialize).toHaveBeenCalled();
        });

        it('should initialize websockt connection', function() {
            this.after(function() {
                Connection.close();
            });
            spyOn(Connection, 'initialize');
            board.initialize();

            expect(Connection.initialize).toHaveBeenCalled();
        });
    });

    describe('get section', function() {
        it('should get section by section name', function() {
            var wellDom = $('#' + wellId);

            expect(board.getSection(wellId).dom).toBe(wellDom);
        });
    });
});