var Connection = (function() {
    function connect(connectionUrl) {
        var socket;
        try {
            if (window.MozWebSocket) {
                window.WebSocket = window.MozWebSocket;
            }
            socket = new WebSocket(connectionUrl);
            return socket;
        } catch(e) {
            console.log(e);
        }
    }

    return {
        initialize: function(connectionUrl) {
            this.connectionUrl = connectionUrl ? connectionUrl : 'ws://localhost:4000/';
            this.socket = connect(this.connectionUrl);
            this.onMessage(function(evt){alert(evt.data)});
        },

        sendMessage: function(data) {
            this.socket.send(data);
        },

        onMessage: function(handler) {
            this.socket.onmessage = handler;
        },

        close: function() {
            if(this.socket.readyState != this.socket.CLOSED || this.socket.readyState != this.socket.CLOSING)
                this.socket.close();
            this.socket = undefined;
        }
    }
})();
