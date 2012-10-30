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

        it('should hold an empty sticky list', function() {
            expect(section.stickies).toEqual({});
            expect(section.stickiesLength).toBe(0);
        });
    });

    describe('add sticky', function() {
        it('should call update sticky with section', function() {
            section = new Section('section1');
            new Section('section2');

            spyOn(section, 'addSticky');
            section.addStickyButton.click();

            expect(section.addSticky).toHaveBeenCalled();
        });

        it('should add a new sticky', function() {
            var newSticky = section.addSticky();

            expect(section.stickiesLength).toBe(1);
            expect(section.stickies[newSticky.uuid]).toBe(newSticky);
        });

        it('should add a new sticky with specific uuid', function() {
            var newSticky = section.addSticky('some uuid');

            expect(newSticky.uuid).toBe('some uuid');
        });

        it('should add a sticky with status modifying', function() {
            var newSticky = section.addSticky();

            expect(newSticky.status).toBe('modifying');
        });

        it('should add a new sticky dom', function() {
            section.addSticky();

            expect(section.dom.find('.section-body')).toContain('.sticky');
        });

        it('should bind the sticky onRemove function with onStickyRemove', function() {
            var newSticky = section.addSticky();

            expect(newSticky.onRemove).toEqual(section.onStickyRemove)
        });
    });

    describe('update sticky', function() {
        it('should update sticky if ', function() {
            var newSticky = section.addSticky();
            var data = {
                'uuid': newSticky.uuid,
                'lastModified': 'some time',
                'content': 'some content'
            }
            section.updateSticky(data);

            expect(newSticky.lastModified).toBe('some time');
            expect(newSticky.content).toBe('some content');
        });
    });

    describe('update sticky in sticky dialog', function() {
        var newSticky;
        beforeEach(function() {
            StickyDialog.initialize();
            section.addStickyButton.click();
            for (var uuid in section.stickies) {
                newSticky = section.stickies[uuid];
                break;
            }
        });

        it('should bind the current sticky to sticky dialog data', function() {
            expect(StickyDialog.currentSticky).toBe(newSticky);
        });

        it('should update sticky with input text when click ok button', function() {
            StickyDialog.dom.find('textarea').text('some text');
            StickyDialog.okButton.click();

            expect(newSticky.content).toBe('some text');
        });

        it('should clear dialog after update', function() {
            StickyDialog.dom.find('textarea').text('some text');
            StickyDialog.okButton.click();

            expect(StickyDialog.dom.find('textarea').val()).toBe('');
        });
    });

    describe('remove sticky', function() {
        beforeEach(function() {
            StickyDialog.initialize();
            section.addStickyButton.click();
        });

        it('should call the sticky onRemove function', function() {
            spyOn(StickyDialog.currentSticky, 'onRemove');
            StickyDialog.cancelButton.click();

            expect(StickyDialog.currentSticky.onRemove).toHaveBeenCalled();
        });

        it('should remove the sticky dom', function() {
            StickyDialog.cancelButton.click();

            expect(section.dom.find('.section-body')).toBeEmpty();
        });

        it('should remove the sticky holder', function() {
            StickyDialog.cancelButton.click();

            expect(section.stickies).toEqual({});
            expect(section.stickiesLength).toBe(0);
        });
    });
});