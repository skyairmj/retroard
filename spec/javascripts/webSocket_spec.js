describe('web socket', function() {

    var connection;
    beforeEach(function() {
        connection = new Connection();
        connection.initialize();
    })

    describe('send message', function() {
        it('should send message with data', function() {
            var dataHolder;
            spyOn(connection.socket, 'send').andCallFake(function(data) {
                dataHolder = data;
            });
            connection.sendMessage('hello');
            expect(dataHolder).toBe('hello');
        });
    });
});