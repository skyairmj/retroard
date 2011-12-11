describe('board', function() {
    describe('initialize', function() {

        var board;
        var wellId = 'well';
        var lessWellId = 'lessWell';
        var puzzleId = 'puzzle';
        var ideaId = 'idea';

        function getSection(sectionId) {
            var sections = board.sections;
            for (var i in sections) {
                var section = sections[i];
                if (section.dom.attr('id') == sectionId) {
                    return section;
                }
            }
            return null;
        }

        beforeEach(function() {
            loadFixtures('board.html');
            board = new Board([wellId, lessWellId, puzzleId, ideaId]);
        });

        it('should create sections of well, less well, puzzle, idea', function() {

            expect(getSection(wellId).dom).toBe($('#' + wellId));
            expect(getSection(lessWellId).dom).toBe($('#' + lessWellId));
            expect(getSection(puzzleId).dom).toBe($('#' + puzzleId));
            expect(getSection(ideaId).dom).toBe($('#' + ideaId));
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
    });

});