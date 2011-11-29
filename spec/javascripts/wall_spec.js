describe('initialize', function() {

        var board;

        function getWall(wallId) {
            var walls = board.walls;
            for (var i in walls) {
                var wall = walls[i];
                if (wall.dom.attr('id') == wallId) {
                    return wall;
                }
            }
            return null;
        }

        beforeEach(function() {
            loadFixtures('board.html');
        });

        it('should create walls of well, less well, puzzle, idea', function() {
            var wellId = 'well';
            var lessWellId = 'lessWell';
            var puzzleId = 'puzzle';
            var ideaId = 'idea';

            board = new Board([wellId, lessWellId, puzzleId, ideaId]);

            expect(getWall(wellId).dom).toBe($('#' + wellId));
            expect(getWall(lessWellId).dom).toBe($('#' + lessWellId));
            expect(getWall(puzzleId).dom).toBe($('#' + puzzleId));
            expect(getWall(ideaId).dom).toBe($('#' + ideaId));
        });
    });