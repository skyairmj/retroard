(function(){
	History = Backbone.View.extend({
	    initialize: function() {
	        this.historyDialog = $('#historyDialog');
	        this.historyHeaderButton = $('#historyHeaderButton');
	        this.activeClass = 'active';
	    },

	    initialize2: function() {
	        var that = this;
	        this.historyHeaderButton.on('click', function(e) {
	            if(that.historyDialog.is(':visible')) {
	                that.historyDialog.hide();
	                that.historyHeaderButton.removeClass(that.activeClass);
	            }
	            else {
	                that.historyDialog.show();
	                that.historyHeaderButton.addClass(that.activeClass);
	            }

	            e.stopPropagation();
	        });

	        $(document).on('click', function() {
	            that.historyDialog.hide();
	            that.historyHeaderButton.removeClass(that.activeClass);
	        });
	    }
	});
}());