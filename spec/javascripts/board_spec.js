describe('board', function() {
    it('should register listener for sticky add button click event to display sticky dialog', function() {
        var board = new Board('well');

        var listenerHolder;
        var eventHolder;
        spyOn(board.walls[0], 'registerAddStickyButtonListener').andCallFake(function(event, listener) {
            eventHolder = event;
            listenerHolder = listener;
        });

        board.initialize();

        expect(eventHolder).toBe('click');
        expect(listenerHolder).toBe(board.stickyDialog.display);
    });
});