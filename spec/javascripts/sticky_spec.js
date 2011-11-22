describe('sticky', function() {
    describe('add sticky', function() {
        var sticky;
        beforeEach(function() {
            loadFixtures('board.html');
            sticky = new Sticky();
        });

        it('should pop up sticky adding dialog when click add sticky button', function() {
            sticky.addStickyButton.click();

            expect(sticky.addStickyDialog.dom).toBeVisible();
        });

        it('should hide sticky adding dialog when click cancel button', function() {
            sticky.addStickyButton.click();
            sticky.addStickyDialog.cancelButton.click();

            expect(sticky.addStickyDialog.dom).toBeHidden();
        });
    });
});