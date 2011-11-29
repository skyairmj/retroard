describe('dialog', function() {
    describe('sticky dialog', function() {
        var stickyDialog;
        beforeEach(function() {
            var fixture = '<div id="stickyDialog">'
                                + '<button class="okButton"></button>'
                                + '<button class="cancelButton"></button>'
                        + '</div>'
                        + '<div id="modal"></div>';
            setFixtures(fixture);
            stickyDialog = new StickyDialog();
            stickyDialog.dom.hide();
            stickyDialog.modal.hide();
        });

        it('should hide sticky dialog and modal when click cancel button', function() {
            stickyDialog.cancelButton.click();

            expect(stickyDialog.dom).toBeHidden();
            expect(stickyDialog.modal).toBeHidden();
        });

        it('should hide sticky dialog and modal when click ok button', function() {
            stickyDialog.okButton.click();

            expect(stickyDialog.dom).toBeHidden();
            expect(stickyDialog.modal).toBeHidden();
        });
    });
});