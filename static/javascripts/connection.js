var Connection = (function() {
	var websocket_server_address = "localhost";
	var websocket_server_port_number = "3000";
	var websocket_mount_point = "ws";
    function connect(connectionUrl) {
        var socket;
        try {
            if (window.MozWebSocket) {
                window.WebSocket = window.MozWebSocket;
            }
            socket = new WebSocket(connectionUrl);
            console.log(socket);
            return socket;
        } catch(e) {
            console.log(e);
        }
    }

    return {
        initialize: function(serverHost, serverPort) {
			serverHost = serverHost || websocket_server_address;
			serverPort = serverPort || websocket_server_port_number;
            this.connectionUrl = 'ws://'+serverHost+':'+serverPort+'/'+websocket_mount_point;
            this.socket = connect(this.connectionUrl);
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

		saveSticky: function(sticky) {
			this.sendMessage($.toJSON({
	            'resource': 'sticky',
	            'method': 'save',
	            'data': sticky.toJSON()
	        }));
		},
		
		saveStickyGroup: function(stickyGroup) {
			this.sendMessage($.toJSON({
				'resource': 'stickyGroup',
				'method': 'save',
				'data': stickyGroup.toJSON()
			}));
		}
    }
})();
