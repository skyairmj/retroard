describe('sticky', function() {
    describe('initialize', function() {

        var sticky;
        beforeEach(function() {
            var fixture = '<div id="stickyDialog"></div>'
                            + '<div id="modal"></div>';
            setFixtures(fixture);
            $('#stickyDialog').hide();
            $('#modal').hide();
            sticky = new Sticky();
        });

        it('should initiate a sticky with empty content and modifying status', function() {
            expect(sticky.content).toBe('');
            expect(sticky.status).toBe('modifying');
        });


        it('should pop up a sticky dialog and the modal', function() {
            expect($('#stickyDialog')).toBeVisible();
            expect($('#modal')).toBeVisible();
        });
    });
});