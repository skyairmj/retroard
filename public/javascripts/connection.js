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
                        console.warn('You Are Not Supposed to Receive This Message: '+message)
                        return;
                    }
                    var expectedCategoryTitle = match[2]
                    var expectedNoteId = match[3]
                    var expectedData = Utils.jsonifyQueryString(messageJSON.data)
                    switch(messageJSON.method){
                        case 'put':
                        self.trigger('remote:create:sticky', expectedCategoryTitle, expectedNoteId, expectedData);
                        break;
                        case 'post':
                        self.trigger('remote:update:sticky', expectedCategoryTitle, expectedNoteId, expectedData);
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

		createSticky: function(sticky) {
			this.sendMessage($.toJSON({
	            'resourceUri': '/'+window.retroId+'/'+sticky.category+'/notes/'+sticky.uuid,
	            'method': 'put',
	            'data': $.param({'content': sticky.content})
	        }));
		},

		updateSticky: function(sticky) {
			this.sendMessage($.toJSON({
				'resourceUri': '/'+window.retroId+'/'+sticky.category+'/notes/'+sticky.uuid,
				'method': 'post',
				'data': $.param({'newSubordinate': {'uuid': sticky.newSubordinate.uuid,'category': sticky.newSubordinate.category}})
			}));
		},
        
		updateSticky2: function(sticky) {
			this.sendMessage($.toJSON({
				'resourceUri': '/'+window.retroId+'/'+sticky.category+'/notes/'+sticky.uuid,
				'method': 'post',
				'data': $.param({'vote': sticky.voteCount})
			}));
        }
    }));
})();
