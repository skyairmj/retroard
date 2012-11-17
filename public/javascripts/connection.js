(function() {
    Connection = new (Backbone.Model.extend({
    	websocket_server_address : "localhost:3000",
    	websocket_mount_point : "ws",
        
        initialize: function(){
            if (window.MozWebSocket) {
                window.WebSocket = window.MozWebSocket;
            }
        },
        
        connect: function (serverHost) {
		    var serverHost = serverHost || this.websocket_server_address;
            var connectionUrl = 'ws://'+serverHost+'/'+this.websocket_mount_point;
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
                    switch(messageJSON.method){
                        case 'put':
                        self.trigger('remote:create:sticky', expectedCategoryTitle, expectedNoteId, messageJSON.data);
                        break;
                        case 'post':
                        self.trigger('remote:update:sticky', expectedCategoryTitle, expectedNoteId, messageJSON.data);
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
	            'data': {'content': sticky.content}
	        }));
		},

		updateSticky: function(sticky) {
			this.sendMessage($.toJSON({
				'resourceUri': '/'+window.retroId+'/'+sticky.category+'/notes/'+sticky.uuid,
				'method': 'post',
				'data': {
                    'newSubordinate': {
                        'uuid': sticky.newSubordinate.uuid,
                        'category': sticky.newSubordinate.category
                    }
                }
			}));
		},
        
		updateSticky2: function(sticky) {
			this.sendMessage($.toJSON({
				'resourceUri': '/'+window.retroId+'/'+sticky.category+'/notes/'+sticky.uuid,
				'method': 'post',
				'data': {
                    'vote': sticky.voteCount
                }
			}));
        }
    }));
})();
