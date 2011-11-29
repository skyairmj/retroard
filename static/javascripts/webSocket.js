var Connection = (function() {

    function Connection(connectionUrl) {
        this.connectionUrl = connectionUrl ? connectionUrl : 'ws://localhost:4000/';
    }

    Connection.prototype = {
        initialize : function() {
            this.socket = connect(this.connectionUrl);
        },

        sendMessage : function(data) {
            this.socket.send(data);
        },

        onMessage : function(handler) {
            this.socket.onmessage = handler;
        }
    }

    function connect(connectionUrl) {
        var socket;
        try {
            if (window.MozWebSocket) {
                window.WebSocket = window.MozWebSocket;
            }
            socket = new WebSocket(connectionUrl);
            return socket;
        } catch(e) {
            console.log(e)
        }
    }
    return Connection;
})();