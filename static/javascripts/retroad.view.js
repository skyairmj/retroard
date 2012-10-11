(function(){
	/*
	var AppView = Backbone.View.extend({
		
	});
	window.App = new AppView
	*/
	var board = new Board();
	$.getJSON('/'+ teamName + '/existing_cards', function(sections) {
		
		for (var sectionName in sections) {
			var currentSection = board.getSection(sectionName);
		    for(var uuid in sections[sectionName]) {
				currentSection.addSticky(uuid, sections[sectionName][uuid].content);
			}
		}
	});
	Connection.initialize(option['serverHost'], option['serverPort']);
    Listener.initialize(board);
}());