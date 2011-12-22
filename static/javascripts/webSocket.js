var Connection = (function() {
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
        initialize: function(connectionUrl) {
            this.connectionUrl = connectionUrl ? connectionUrl : 'ws://localhost:4000/';
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
        }
    }
})();
