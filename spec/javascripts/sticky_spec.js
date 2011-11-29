describe('sticky', function() {
    describe('initialize', function() {

        var sticky;
        beforeEach(function() {
            sticky = new Sticky();
        });

        it('should initiate a sticky with empty content and modifying status', function(){
            expect(sticky.content).toBe('')
            expect(sticky.status).toBe('modifying')
        })


        it('should pop up a sticky dialog', function() {
            setFixtures('<div id="stickyDialog"></div>')
            sticky.popUpStickyDialog();

            expect($('#stickyDialog')).toBeVisible();
        });
    });
});