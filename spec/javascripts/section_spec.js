describe('section', function() {

    var type = 'well';
    var section;
    beforeEach(function() {
        section = new Section(type);
    });

    describe('initialize', function(){
        it('should hold a type', function(){
            expect(section.type).toBe(type);
        })

        it('should hold empty sticky list', function(){
            expect(section.stickies.length).toBe(0);
        })
    })
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