(function(){
	/*
	var AppView = Backbone.View.extend({
		
	});
	window.App = new AppView
	*/
	var board = new Board({sectionIds: ['well', 'lessWell', 'puzzle', 'idea']});
    board.initialize2(option);
	$.getJSON('/'+ teamName + '/existing_cards', function(sections) {
		for (var sectionName in sections) {
			var currentSection = board.getSection(sectionName);
		    for(var uuid in sections[sectionName]) {
				var sticky = currentSection.addSticky(uuid);
				sticky.update({content:sections[sectionName][uuid].content});
			}
		}
	});
	
}());