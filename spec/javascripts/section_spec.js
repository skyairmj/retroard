describe('section', function() {

    var section;
    beforeEach(function() {
        var fixture = '<div id="well">'
                        + '<div class="sectionBody"></div>'
                    + '</div>'
        setFixtures(fixture);

        section = new Section('well');
    });

    describe('initialize', function() {
        it('should hold a dom element', function() {
            expect(section.dom).toBe($('#well'));
        });

        it('should hold a name', function() {
            expect(section.name).toBe('well');
        });

        it('should hold empty sticky list', function() {
            expect(section.stickies.length).toBe(0);
        });
    });
    describe('add sticky', function() {
        it('should call add sticky with section', function() {
            var fixture = '<div id="well">'
                            + '<div class="addStickyButton"></div>'
                            + '<div class="sectionBody"></div>'
                        + '</div>'
                        + '<div id="someSection">'
                            + '<div class="sectionBody"></div>'
                        + '</div>';
            setFixtures(fixture);
            section = new Section('well');
            new Section('someSection');

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
});