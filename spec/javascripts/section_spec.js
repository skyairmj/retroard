describe('section', function() {

    var name = 'well';
    var section;
    beforeEach(function() {
        setFixtures('<div id="well"></div>');
        section = new Section(name);
    });

    describe('initialize', function() {
        it('should hold a dom element', function() {
            expect(section.dom).toBe($('#well'));
        });

        it('should hold a name', function() {
            expect(section.name).toBe(name);
        });

        it('should hold empty sticky list', function() {
            expect(section.stickies.length).toBe(0);
        });
    });
    describe('add sticky', function() {
        it('should add a new sticky', function() {
            var newSticky = section.addSticky();

            expect(section.stickies.length).toBe(1);
            expect(section.stickies[0]).toBe(newSticky);
        });

        it('should add a sticky with status modifying', function() {
            var newSticky = section.addSticky();

            expect(newSticky.status).toBe('modifying');
        });
    });
});