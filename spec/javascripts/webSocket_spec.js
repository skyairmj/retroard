describe('web socket', function() {

    beforeEach(function() {
        Connection.initialize();
    })

    describe('send message', function() {
        it('should send message with data', function() {
            var dataHolder;
            spyOn(Connection, 'sendMessage').andCallFake(function(data) {
                dataHolder = data;
            });
            Connection.sendMessage('some message');
            expect(dataHolder).toBe('some message');
        });
    });

    describe('get message', function() {
        it('should bind event handler with data', function() {
            var messageHolder;
            var handler = function(message) {
                messageHolder = message;
            }
            Connection.onMessage(handler);
            Connection.socket.onmessage('some message');
            expect(messageHolder).toBe('some message');
        });
    });
});