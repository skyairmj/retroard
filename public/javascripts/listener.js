var Listener = (function() {

    function updateSticky(content) {

    }

    var messageHandlerTable = {
        'sticky': {
            'save': updateSticky
        }
    }

    return {
        initialize: function(board) {
            Connection.onMessage(function(message) {
				var messageJSON = $.parseJSON(message.data);
                var uriRegex = /^\/retrospective\/(\d+)\/([\w|\s]+)\/notes\/([\w|-]+)$/
                var match = uriRegex.exec(messageJSON.resourceUri);
                var expectedRetroId = match[1]
                if (expectedRetroId != window.retroId) {
                    console.warn('You Are Not Supposed to Receive The Message!')
                    return;
                }
                var expectedCategoryTitle = match[2]
                var expectedNoteId = match[3]
                switch(messageJSON.method){
                    case 'put':
                    board.getSection(expectedCategoryTitle).synchronize(expectedNoteId, messageJSON.data);
                    break;
                    case 'post':
                    board.synchronize(expectedNoteId, messageJSON.data);
                    break;
                }
            });
        }
    }
})();