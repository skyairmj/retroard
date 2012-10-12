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
                that.board.getSection(messageJSON.data.section).synchronizeSticky(messageJSON.data);
            });
        }
    }
})();