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
            var that = this;
            this.board = board;
            Connection.onMessage(function(message) {
				var messageJSON = $.parseJSON(message.data);
                console.log(messageJSON)
                var uriRegex = /^\/retrospective\/(\d+)\/(\w+)\/notes$/
                var match = uriRegex.exec(messageJSON.resourceUri);
                var expectedRetroId = match[1]
                var expectedCategoryTitle = match[2]
                if(expectedRetroId == window.retroId){
                    that.board.getSection(expectedCategoryTitle).synchronizeSticky(messageJSON.data);                    
                }
                else {
                    console.warn('You Are Not Supposed to Receive The Message!')
                }
            });
        }
    }
})();