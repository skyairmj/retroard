(function() {
    Connection = new (Backbone.Model.extend({
    	websocket_server_address : "localhost",
    	websocket_server_port_number : "3000",
    	websocket_mount_point : "ws",
        
        initialize: function(){
            if (window.MozWebSocket) {
                window.WebSocket = window.MozWebSocket;
            }
        },
        
        connect: function (serverHost, serverPort) {
		    var serverHost = serverHost || this.websocket_server_address;
			var serverPort = serverPort || this.websocket_server_port_number;
            var connectionUrl = 'ws://'+serverHost+':'+serverPort+'/'+this.websocket_mount_point;
            try {
                this.socket = new window.WebSocket(connectionUrl);
                console.log(this.socket);
            } catch(e) {
                console.log(e);
            }
        },

        sendMessage: function(data) {
            if(this.socket.readyState == this.socket.OPEN)
                this.socket.send(data);
        },

        onMessage: function(handler) {
            this.socket.onmessage = handler;
        },

        close: function() {
            if(this.socket.readyState == this.socket.OPEN) {
                this.socket.close();
                this.socket = undefined;
            }
        },

		createSticky: function(sticky) {
			this.sendMessage($.toJSON({
	            'resourceUri': '/retrospectives/'+window.retroId+'/'+sticky.category+'/notes/'+sticky.uuid,
	            'method': 'put',
	            'data': {'content': sticky.content}
	        }));
		},

		updateSticky: function(sticky) {
			this.sendMessage($.toJSON({
				'resourceUri': '/retrospectives/'+window.retroId+'/'+sticky.category+'/notes/'+sticky.uuid,
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
				'resourceUri': '/retrospectives/'+window.retroId+'/'+sticky.category+'/notes/'+sticky.uuid,
				'method': 'post',
				'data': {
                    'vote': sticky.voteCount
                }
			}));
        }
    }));
})();
