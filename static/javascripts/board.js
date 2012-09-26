(function(){
	var Board = Backbone.Model.extend({
		initialize: function(sectionIds) {

	        this.sections = [];
	        for (var i in sectionIds) {
	            this.sections.push(new Section(sectionIds[i]));
	        }

	        this.history = new History();
	    },

	    initialize2: function(option) {
	        this.history.initialize2();
	        new StickyDialog();
	        Connection.initialize(option['serverHost'], option['serverPort']);
	        Listener.initialize(this);
	    },

	    getSection: function(name) {
	        for (var index in this.sections) {
	            if(this.sections[index].name == name) {
	                return this.sections[index];
	            }
	        }
	    }
	});
}());