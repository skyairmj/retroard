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
            expect(section.stickies.length).toBe(0);
        });
    });

    describe('add sticky', function() {
        it('should call add sticky with section', function() {
            section = new Section('section1');
            new Section('section2');

            spyOn(section, 'addSticky');
            section.addStickyButton.click();

            expect(section.addSticky).toHaveBeenCalled();
        });

        it('should add a new sticky', function() {
            var newSticky = section.addSticky();

            expect(section.stickies.length).toBe(1);
            expect(section.stickies[0]).toBe(newSticky);
        });

        it('should add a sticky with status modifying', function() {
            var newSticky = section.addSticky();

            expect(newSticky.status).toBe('modifying');
        });

        it('should add a new sticky dom', function() {
            section.addSticky();

            expect(section.dom.find('.sectionBody')).toContain('.sticky');
        });
    });


    describe('update sticky', function() {
        beforeEach(function() {
            StickyDialog.initialize();
            section.addStickyButton.click();
        });

        it('should bind the current sticky to sticky dialog data', function() {
            expect(StickyDialog.currentSticky).toBe(section.stickies[0]);
        });

        it('should update sticky with input text when click ok button', function() {
            StickyDialog.dom.find('textarea').text('some text');
            StickyDialog.okButton.click();

            expect(section.stickies[0].content).toBe('some text');
        });

        it('should clear dialog after update', function() {
            StickyDialog.dom.find('textarea').text('some text');
            StickyDialog.okButton.click();

            expect(StickyDialog.dom.find('textarea').val()).toBe('');
        });
    });

    xdescribe('remove sticky', function() {
        beforeEach(function() {
            StickyDialog.initialize();
            section.addStickyButton.click();
        });

        it('should remove sticky when click cancel button', function() {
            StickyDialog.cancelButton.click();

            expect(section.stickies.length).toBe(0);
        });

    });
});