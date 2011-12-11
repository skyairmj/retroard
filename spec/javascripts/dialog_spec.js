describe('dialog', function() {
    describe('sticky dialog', function() {
        var stickyDialog;
        beforeEach(function() {
            var fixture = '<div id="stickyDialog">'
                                + '<textarea></textarea>'
                                + '<button class="okButton"></button>'
                                + '<button class="cancelButton"></button>'
                        + '</div>'
                        + '<div id="modal"></div>';
            setFixtures(fixture);
            StickyDialog.initialize();
            StickyDialog.dom.show();
            StickyDialog.modal.show();
            $('body').css('overflow', 'hidden');
        });

        afterEach(function() {
            $('body').css('overflow', 'visible');
        });

        describe('click ok button', function() {
            beforeEach(function() {
                StickyDialog.okButton.click();
            });

            it('should be able to scroll window', function() {
                expect($('body').css('overflow')).toBe('visible');
            });

            it('should hide sticky dialog and modal', function() {
                expect(StickyDialog.dom).toBeHidden();
                expect(StickyDialog.modal).toBeHidden();
            });
        });


        describe('click cancel button', function() {
            beforeEach(function() {
                StickyDialog.cancelButton.click();
            });

            it('should hide sticky dialog and modal when click cancel button', function() {
                expect(StickyDialog.dom).toBeHidden();
                expect(StickyDialog.modal).toBeHidden();
            });

            it('should be able to scroll window after click ok button', function() {
                expect($('body').css('overflow')).toBe('visible');
            });
        });

    });
});