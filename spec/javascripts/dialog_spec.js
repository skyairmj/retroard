describe('dialog', function() {
    describe('sticker dialog', function() {
        var stickerDialog;
        beforeEach(function() {
            var fixture = '<div id="stickerDialog">'
                                + '<textarea></textarea>'
                                + '<button class="okButton"></button>'
                                + '<button class="cancelButton"></button>'
                        + '</div>'
                        + '<div id="modal"></div>';
            setFixtures(fixture);
            StickerDialog.initialize();
            sticker = new Sticker(function() {}, "some uuid", "some section");
            StickerDialog.popUp(sticker);
        });

        afterEach(function() {
            $('body').css('overflow', 'visible');
        });

        describe('click ok button', function() {
            beforeEach(function() {
                StickerDialog.okButton.click();
            });

            it('should be able to scroll window', function() {
                expect($('body').css('overflow')).toBe('visible');
            });

            it('should hide sticker dialog and modal', function() {
                expect(StickerDialog.dom).toBeHidden();
                expect(StickerDialog.modal).toBeHidden();
            });
        });

        describe("click ok button with sending message", function() {
            it('should send socket message with sticker data', function() {
                Connection.initialize();
                var dataHolder;
                spyOn(Connection, 'sendMessage').andCallFake(function(data) {
                    dataHolder = $.evalJSON(data);
                });
                $('div#stickerDialog textarea').text("content");
                teamName = 'rca';
                StickerDialog.okButton.click();
                expect(dataHolder).toEqual({
                    'resource': 'sticker',
                    'method': 'save',
                    'data': {
                        'section' : 'some section',
                        'uuid': sticker.uuid,
                        'lastModified': sticker.lastModified,
                        'content': "content",
                        'teamName': 'rca'
                    }
                });
            });
        });

        describe('click cancel button', function() {
            beforeEach(function() {
                StickerDialog.cancelButton.click();
            });

            it('should hide sticker dialog and modal when click cancel button', function() {
                expect(StickerDialog.dom).toBeHidden();
                expect(StickerDialog.modal).toBeHidden();
            });

            it('should be able to scroll window after click ok button', function() {
                expect($('body').css('overflow')).toBe('visible');
            });
        });
    });
});