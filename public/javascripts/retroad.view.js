(function(){
	/*
	var AppView = Backbone.View.extend({
		
	});
	window.App = new AppView
	*/
	var board = new Board();
	$.getJSON('/'+ teamName + '/retro/'+retroId, function(retrospective) {
	 	
        $.each(retrospective.categories, function(index, category){
            var section = new Section({title: category.title}).render();
            board.add(category.title, section);
            
            $.each(category.notes, function(index2, note) {
                section.add(new StickyView({model: new Sticky(category.title, note.content, note.uuid)}).render());
            });
        });
 	});
	Connection.initialize(option['serverHost'], option['serverPort']);
    Listener.initialize(board);
}());