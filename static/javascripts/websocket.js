var Connection = {
  initialize: function() {
    this.connect();
  },

  connect: function() {
    try{
      this.socket = new MozWebSocket('ws://localhost:4000/');
    }catch(e){
      alert(e)
    }
    this.socket.onmessage = this.onmessage;
  },

  onmessage: function(m) {
    alert(m.data)
    alert(JSON.parse(m.data));
  }
}
