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
            stickyDialog.dom.show();
            stickyDialog.modal.show();
            $('body').css('overflow', 'hidden');
            stickyDialog.initialize();
        });

        afterEach(function() {
            $('body').css('overflow', 'visible');
        });

        describe('click ok button', function() {
            beforeEach(function() {
                stickyDialog.okButton.click();
            });

            it('should be able to scroll window', function() {
                expect($('body').css('overflow')).toBe('visible');
            });

            it('should hide sticky dialog and modal', function() {
                expect(stickyDialog.dom).toBeHidden();
                expect(stickyDialog.modal).toBeHidden();
            });
        });


        describe('click cancel button', function() {
            beforeEach(function() {
                stickyDialog.cancelButton.click();
            });

            it('should hide sticky dialog and modal when click cancel button', function() {
                expect(stickyDialog.dom).toBeHidden();
                expect(stickyDialog.modal).toBeHidden();
            });

            it('should be able to scroll window after click ok button', function() {
                expect($('body').css('overflow')).toBe('visible');
            });
        });

    });
});