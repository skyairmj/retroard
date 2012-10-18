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
                var sticky = new Sticky(category.title, note.content, note.uuid);
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
 	});
	Connection.initialize(option['serverHost'], option['serverPort']);
    Listener.initialize(board);
}());