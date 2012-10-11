(function(){
	Board = Backbone.View.extend({
		initialize: function(option) {
			this.sections = {}
			this.sections['well'] = new WellSection();
			this.sections['lessWell'] = new LessWellSection();
			this.sections['puzzle'] = new PuzzleSection();
			this.sections['idea'] = new IdeaSection();
			
	        this.history = new History();
	        this.history.initialize2();
	    },

	    getSection: function(name) {
			return this.sections[name];
	    }
	});
	
	Retrospective = Backbone.Model.extend({
		
	});
}());