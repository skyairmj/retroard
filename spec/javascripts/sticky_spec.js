describe('sticky', function() {
    describe('add sticky', function() {
        var sticky;
        beforeEach(function() {
            loadFixtures('board.html');
            sticky = new Sticky();
        });

        it('should pop up sticky adding dialog and modal when click add sticky button', function() {
            expect(sticky.addStickyDialog.dom).toBeHidden();
            expect(sticky.addStickyDialog.modal).toBeHidden();

            sticky.addStickyButton.click();

            expect(sticky.addStickyDialog.dom).toBeVisible();
            expect(sticky.addStickyDialog.modal).toBeVisible();
        });

        it('should hide sticky adding dialog and modal when click cancel button', function() {
            sticky.addStickyButton.click();
            sticky.addStickyDialog.cancelButton.click();

            expect(sticky.addStickyDialog.dom).toBeHidden();
            expect(sticky.addStickyDialog.modal).toBeHidden();
        });

        it('should hide sticky adding dialog and modal when click ok button', function() {
            sticky.addStickyButton.click();
            sticky.addStickyDialog.okButton.click();

            expect(sticky.addStickyDialog.dom).toBeHidden();
            expect(sticky.addStickyDialog.modal).toBeHidden();
        });
    });
});