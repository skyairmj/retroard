(function(){
	AppView = Backbone.View.extend({
		initialize: function(){
        	var board = new Board();
        	$.ajax({
                url: '/'+retroId,
                dataType: 'json', 
                success: function(retrospective) {
                    $.each(retrospective.categories, function(index, category){
                        var section = new Section({title: category.title}).render();
                        board.add(category.title, section);
            
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
                    Listener.listen(board);
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
        }
	});
	window.App = new AppView()
}());