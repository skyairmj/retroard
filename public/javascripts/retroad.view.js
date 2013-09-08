(function(){
	AppView = Backbone.View.extend({
/**  
        //TODO: need to take no websocket support in browser into consideration
        var support = "MozWebSocket" in window ? 'MozWebSocket' : ("WebSocket" in window ? 'WebSocket' : null);
        if (!support) {
            return;   
        }
   */     
		initialize: function(){
        	this.board = new Board();
            that = this;
        	$.ajax({
                url: '/'+retroId,
                dataType: 'json', 
                success: function(retrospective) {
                    $.each(retrospective.categories, function(index, category){
                        var section = new Section({title: category.title}).render();
                        that.board.add(category.title, section);
                        
                        $.each(category.notes, function(index2, note) {
                            var sticker = new Sticker(category.title, note.content, note.uuid, note.vote);
                            if (!!note.subordinates.length){
                                $.each(note.subordinates, function(index3, subordinate) {
                                    sticker.append(new Sticker(category.title, subordinate.content, subordinate.uuid))
                                });
                                section.add(new StickerGroupView({model: sticker}).render());
                            }
                            else {
                                section.add(new StickerView({model: sticker}).render());
                            }
                        });
                    });
                    _.extend(Connection, Backbone.Events);
                    Connection.on('remote:create:sticker', that.syncCreate, that);
                    Connection.on('remote:update:sticker', that.syncUpdate, that);
                    Connection.on('remote:connection:ready', that.notifyConnected, that);
                    Connection.on('remote:connection:closed', that.notifyDisconnected, that);
                    
                    Connection.connect(window.location.host);
             	},
                error: function(jqXHR, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
		},
        
        reload: function() {
            $('article#sections').empty();
            Connection.close();
            this.initialize();
        },
        
        syncCreate: function(section, stickerId, stickerData){
            this.board.getSection(section).synchronize(stickerId, stickerData);
            MessageBox.append(new InformationMessage({message: 'Others added a new sticker under "'+section+'".'}).render());
        },
        
        syncUpdate: function(section, stickerId, stickerData) {
            this.board.synchronize(stickerId, stickerData);
            MessageBox.append(new InformationMessage({message: 'Others updated a sticker under"'+section+'".'}).render());
        },
        
        notifyConnected: function() {
            MessageBox.append(new SuccessMessage({message: 'You are in the retrospective. Start your journey now.'}).render());
        },
        
        notifyDisconnected: function() {
            MessageBox.append(new ErrorMessage({message: 'Sorry, you\' are disconnected with the retrospective.<br/> Your modifications may not be saved and synchronized. Please refresh your browser.', fadeOut: false}).render());
        }
	});
	window.App = new AppView()
}());