(function(){
	Section = Backbone.View.extend({
		events: {
			'click .addStickyButton': 'addSticky2'
		},

	    initialize: function() {
			this.sectionBody = this.$('.sectionBody')
	        this.stickies = {};
	    },
	
		addSticky: function(uuid, content) {
			uuid = uuid || Utilities.generateUUID();
			content = content || '';
	        var newSticky = new Sticky(uuid, content, this.name);
	        this.stickies[uuid] = newSticky;
			return newSticky;
		},
	
		addSticky2: function() {
			StickyDialog.reset(this.addSticky());
		},
		
		updateSticky: function(data) {
            var newSticky = this.getSticky(data.uuid);
            if (!newSticky) {
                newSticky = this.addSticky(data.uuid);
            }
            newSticky.update(data);
            return newSticky;
        },

        getSticky: function(uuid) {
            return this.stickies[uuid];
        }
	});
	
	WellSection = Section.extend({el: '#well', name: 'well'});
	LessWellSection = Section.extend({el: '#lessWell', name: 'lessWell'});
	PuzzleSection = Section.extend({el: '#puzzle', name: 'puzzle'});
	IdeaSection = Section.extend({el: '#idea', name: 'idea'});	
	
	StickyCollection = Backbone.Collection.extend({
		
	});
}());