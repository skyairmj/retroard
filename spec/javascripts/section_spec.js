describe('section', function() {

    var section;
    beforeEach(function() {
        loadFixtures('section.html');

        section = new Section('section1');
    });

    describe('initialize', function() {
        it('should hold a dom element', function() {
            expect(section.dom).toBe($('#section1'));
        });

        it('should hold a name', function() {
            expect(section.name).toBe('section1');
        });

        it('should hold an empty sticker list', function() {
            expect(section.stickies).toEqual({});
            expect(section.stickiesLength).toBe(0);
        });
    });

    describe('add sticker', function() {
        it('should call update sticker with section', function() {
            section = new Section('section1');
            new Section('section2');

            spyOn(section, 'addSticker');
            section.addStickerButton.click();

            expect(section.addSticker).toHaveBeenCalled();
        });

        it('should add a new sticker', function() {
            var newSticker = section.addSticker();

            expect(section.stickiesLength).toBe(1);
            expect(section.stickies[newSticker.uuid]).toBe(newSticker);
        });

        it('should add a new sticker with specific uuid', function() {
            var newSticker = section.addSticker('some uuid');

            expect(newSticker.uuid).toBe('some uuid');
        });

        it('should add a sticker with status modifying', function() {
            var newSticker = section.addSticker();

            expect(newSticker.status).toBe('modifying');
        });

        it('should add a new sticker dom', function() {
            section.addSticker();

            expect(section.dom.find('.section-body')).toContain('.sticker');
        });

        it('should bind the sticker onRemove function with onStickerRemove', function() {
            var newSticker = section.addSticker();

            expect(newSticker.onRemove).toEqual(section.onStickerRemove)
        });
    });

    describe('update sticker', function() {
        it('should update sticker if ', function() {
            var newSticker = section.addSticker();
            var data = {
                'uuid': newSticker.uuid,
                'lastModified': 'some time',
                'content': 'some content'
            }
            section.updateSticker(data);

            expect(newSticker.lastModified).toBe('some time');
            expect(newSticker.content).toBe('some content');
        });
    });

    describe('update sticker in sticker dialog', function() {
        var newSticker;
        beforeEach(function() {
            StickerDialog.initialize();
            section.addStickerButton.click();
            for (var uuid in section.stickies) {
                newSticker = section.stickies[uuid];
                break;
            }
        });

        it('should bind the current sticker to sticker dialog data', function() {
            expect(StickerDialog.currentSticker).toBe(newSticker);
        });

        it('should update sticker with input text when click ok button', function() {
            StickerDialog.dom.find('textarea').text('some text');
            StickerDialog.okButton.click();

            expect(newSticker.content).toBe('some text');
        });

        it('should clear dialog after update', function() {
            StickerDialog.dom.find('textarea').text('some text');
            StickerDialog.okButton.click();

            expect(StickerDialog.dom.find('textarea').val()).toBe('');
        });
    });

    describe('remove sticker', function() {
        beforeEach(function() {
            StickerDialog.initialize();
            section.addStickerButton.click();
        });

        it('should call the sticker onRemove function', function() {
            spyOn(StickerDialog.currentSticker, 'onRemove');
            StickerDialog.cancelButton.click();

            expect(StickerDialog.currentSticker.onRemove).toHaveBeenCalled();
        });

        it('should remove the sticker dom', function() {
            StickerDialog.cancelButton.click();

            expect(section.dom.find('.section-body')).toBeEmpty();
        });

        it('should remove the sticker holder', function() {
            StickerDialog.cancelButton.click();

            expect(section.stickies).toEqual({});
            expect(section.stickiesLength).toBe(0);
        });
    });
});