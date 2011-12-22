describe('listener', function() {
    describe('on get sticky', function() {
        var message = {
            'resource': 'sticky',
            'status': 'save',
            'data': {
                'uuid': 'some uuid',
                'lastModified': 'some time',
                'content': 'some content',
                'section': 'some section name'
            }
        };
        var board;
        var section;
        beforeEach(function() {
            Connection.initialize();
            Listener.initialize();
            board = new Board();
            board.initialize();
            section = new Section('some section name');
            board.sections.push(section);
        });

        it('should call update sticky function', function() {
            spyOn(section, 'updateSticky');
            Connection.socket.onmessage(message);

            expect(section.updateSticky).toHaveBeenCalled();
        });

        it('should call update sticky with data', function() {
            var dataHolder;
            spyOn(section, 'updateSticky').andCallFake(function(data) {
                dataHolder = data;
            });

            Connection.socket.onmessage(message);

            expect(dataHolder).toEqual(message.data);
        });
    });
});