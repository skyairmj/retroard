(function() {
    Connection = new (Backbone.Model.extend({
    	WEBSOCKET_MOUNT_POINT : "ws",
        
        initialize: function(){
            if (window.MozWebSocket) {
                window.WebSocket = window.MozWebSocket;
            }
        },
        
        connect: function (serverHost) {
            var connectionUrl = 'ws://'+serverHost+'/'+this.WEBSOCKET_MOUNT_POINT;
            try {
                this.socket = new window.WebSocket(connectionUrl);
                self = this;
                this.socket.onmessage = function(message) {
        			var messageJSON = $.parseJSON(message.data);
                    var uriRegex = /^\/(\w+)\/([\w|\s]+)\/notes\/([\w|-]+)$/
                    var match = uriRegex.exec(messageJSON.resourceUri);
                    var expectedRetroId = match[1]
                    if (expectedRetroId != window.retroId) {
                        console.error('What Embarrassing! A message: "'+message+'" has been mistakenly sent to you.')
                        return;
                    }
                    var expectedCategoryTitle = match[2]
                    var expectedNoteId = match[3]
                    var expectedData = Utils.jsonifyQueryString(messageJSON.data)
                    switch(messageJSON.method){
                        case 'put':
                        self.trigger('remote:create:sticker', expectedCategoryTitle, expectedNoteId, expectedData);
                        break;
                        case 'post':
                        self.trigger('remote:update:sticker', expectedCategoryTitle, expectedNoteId, expectedData);
                        break;
                    }
                }; 
                console.log(this.socket);
            } catch(e) {
                console.log(e);
            }
        },

        sendMessage: function(data) {
            if(!!this.socket && this.socket.readyState == this.socket.OPEN)
                this.socket.send(data);
        },

        close: function() {
            this.off();
            if(!!this.socket && this.socket.readyState == this.socket.OPEN) {
                this.socket.close();
                this.socket = undefined;
            }
        },

		createSticker: function(sticker) {
			this.sendMessage($.toJSON({
	            'resourceUri': '/'+window.retroId+'/'+sticker.category+'/notes/'+sticker.uuid,
	            'method': 'put',
	            'data': $.param({'content': sticker.content})
	        }));
		},

		updateSticker: function(sticker) {
			this.sendMessage($.toJSON({
				'resourceUri': '/'+window.retroId+'/'+sticker.category+'/notes/'+sticker.uuid,
				'method': 'post',
				'data': $.param({'newSubordinate': {'uuid': sticker.newSubordinate.uuid,'category': sticker.newSubordinate.category}})
			}));
		},
        
		updateSticker2: function(sticker) {
			this.sendMessage($.toJSON({
				'resourceUri': '/'+window.retroId+'/'+sticker.category+'/notes/'+sticker.uuid,
				'method': 'post',
				'data': $.param({'vote': sticker.voteCount})
			}));
        }
    }));
})();
