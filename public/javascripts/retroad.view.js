(function(){
	AppView = Backbone.View.extend({
        
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
                            var sticky = new Sticky(category.title, note.content, note.uuid, note.vote);
                            if (!!note.subordinates.length){
                                $.each(note.subordinates, function(index3, subordinate) {
                                    sticky.append(new Sticky(category.title, subordinate.content, subordinate.uuid))
                                });
                                section.add(new StickyGroupView({model: sticky}).render());
                            }
                            else {
                                section.add(new StickyView({model: sticky}).render());
                            }
                        });
                    });
                	Connection.connect(window.location.host);
                    _.extend(Connection, Backbone.Events);
                    Connection.on('remote:create:sticky', that.syncCreate, that);
                    Connection.on('remote:update:sticky', that.syncUpdate, that);
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
        
        syncCreate: function(section, stickyId, stickyData){
            this.board.getSection(section).synchronize(stickyId, stickyData);
            MessageBox.append(new Message({message: 'Others added a new sticky under "'+section+'".'}).render());
        },
        
        syncUpdate: function(section, stickyId, stickyData) {
            this.board.synchronize(stickyId, stickyData);
            MessageBox.append(new Message({message: 'Others updated a sticky under"'+section+'".'}).render());
        }
	});
	window.App = new AppView()
}());