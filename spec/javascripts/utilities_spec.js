describe('utilities', function() {
    describe('generate UUID', function() {
        it('should not generator the same two UUIDs', function() {
            var uuid1 = Utilities.generateUUID();
            var uuid2 = Utilities.generateUUID();

            expect(uuid1).not.toEqual(uuid2);
        });
    });
});