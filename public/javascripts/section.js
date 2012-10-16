(function(){
	Section = Backbone.View.extend({
		events: {
			'click .addStickyButton': 'setStickyTarget'
		},
	
		setStickyTarget: function() {
			StickyDialog.target(this.name);
		},
		
		synchronizeSticky: function(data) {
            if (this.$(data.uuid).length == 0) {
				newSticky = new Sticky(this.name, data.content, data.uuid);
				new StickyView({model: newSticky}).render();
			} else {
				//update the existing sticky
			}
			
		}
	});
	
	WellSection = Section.extend({el: '#well', name: 'well'});
	LessWellSection = Section.extend({el: '#lessWell', name: 'lessWell'});
	PuzzleSection = Section.extend({el: '#puzzle', name: 'puzzle'});
	IdeaSection = Section.extend({el: '#idea', name: 'idea'});	
	
	StickyCollection = Backbone.Collection.extend({
		
	});
}());