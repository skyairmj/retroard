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

    describe('get message', function() {
        it('should bind event handler with data', function() {
            var messageHolder;
            var handler = function(message) {
                messageHolder = message;
            }
            connection.onMessage(handler);
            connection.socket.onmessage('hello');
            expect(messageHolder).toBe('hello');
        });
    });
});