(function(){
	Board = Backbone.View.extend({
		initialize: function(option) {
			that = this
	        that.sections = [];
			$.each(option.sectionIds, function(index, value){
				that.sections.push(new Section({name:value}));
			});
			
	        this.history = new History();
	    },

	    initialize2: function(option) {
	        this.history.initialize2();
	        Connection.initialize(option['serverHost'], option['serverPort']);
	        Listener.initialize(this);
	    },

	    getSection: function(name) {
			results = $.grep(this.sections, function(item, index){
				return item.name == name;
			});
			return results[0];
	    }
	});
	
	Retrospective = Backbone.Model.extend({
		
	});
}());