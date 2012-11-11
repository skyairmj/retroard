(function(){
    Listener = new (Backbone.Model.extend({
        listen: function(board) {
            this.board = board;
            that = this;
            Connection.onMessage(function(message) {
				var messageJSON = $.parseJSON(message.data);
                var uriRegex = /^\/(\w+)\/([\w|\s]+)\/notes\/([\w|-]+)$/
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
                    that.board.getSection(expectedCategoryTitle).synchronize(expectedNoteId, messageJSON.data);
                    MessageBox.append(new Message({message: 'Others added a new sticky under "'+expectedCategoryTitle+'".'}).render())
                    break;
                    case 'post':
                    that.board.synchronize(expectedNoteId, messageJSON.data);
                    MessageBox.append(new Message({message: 'Others updated a sticky under"'+expectedCategoryTitle+'".'}).render())
                    break;
                }
            });
        }
    }));
})();