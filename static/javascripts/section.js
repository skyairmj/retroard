(function(){
	Section = Backbone.View.extend({

	    initialize: function(option) {
	        var that = this;
			this.el = '#'+option.name
	        this.dom = $(this.el);
	        this.addStickyButton = this.dom.find('.addStickyButton');
	        this.name = option.name;
	        this.stickies = {};
	        this.stickiesLength = 0;
	        this.addStickyButton.on('click', function() {
				new StickyDialog({model: that.addSticky()})
	        });
	        this.onStickyRemove = function() {
	            delete that.stickies[this.uuid];
	            that.stickiesLength--;
	        }
	    },

	    addSticky: function(uuid) {
	        var uuid = uuid ? uuid : Utilities.generateUUID();
	        var newSticky = new Sticky(this.onStickyRemove, uuid, this.name);
	        this.stickies[uuid] = newSticky;
	        this.stickiesLength++;
	        this.dom.find('.sectionBody').append(newSticky.dom);
	        return newSticky;
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
	
	Facet = Backbone.Model.extend({
		
	});
}());