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
                that.board.getSection(message.data.section).updateSticky(message.data);
            });
        }
    }
})();