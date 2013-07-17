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

        it('should initialize sticker dialog', function() {
            spyOn(StickerDialog, 'initialize');
            board.initialize();

            expect(StickerDialog.initialize).toHaveBeenCalled();
        });

        it('should initialize websockt connection', function() {
            this.after(function() {
                Connection.close();
            });
            spyOn(Connection, 'initialize');
            board.initialize();

            expect(Connection.initialize).toHaveBeenCalled();
        });

        it('should initialize listener and hold the board', function() {
            spyOn(Listener, 'initialize');
            board.initialize();

            expect(Listener.initialize).toHaveBeenCalled();
        });

        it('should initialize listener and hold the board', function() {
            board.initialize();

            expect(Listener.board).toBe(board);
        });
    });

    describe('get section', function() {
        it('should get section by section name', function() {
            var wellDom = $('#' + wellId);

            expect(board.getSection(wellId).dom).toBe(wellDom);
        });
    });

    describe('create sticker', function() {
        it('should pop up a sticker dialog and the modal when click add sticker', function() {
            spyOn(StickerDialog, 'popUp');
            board.initialize();
            board.getSection(wellId).addStickerButton.click();
            expect(StickerDialog.popUp).toHaveBeenCalled();
        });
    });
});