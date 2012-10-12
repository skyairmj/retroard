(function(){
	StickyDialog = new (Backbone.View.extend({
		el: '#stickyDialog',
		
		events: {
			'click .cancelButton': 'hide',
			'click .okButton': 'add'
		},
		
	    hide: function() {
			if (this.model != null && this.model.isNew()) {
                this.model.remove();
            }
			$(this.el).find('textarea').val('');
	    },
	
		add: function() {
            if (this.model != null && $.trim($(this.el).find('textarea').val()) != '') {
                this.model.update({
                    content: $(this.el).find('textarea').val()
                });
				Connection.sendMessage(this.model.dataToSent());
            } else {
				this.model.remove();
			}
            $(this.el).find('textarea').val('');
		},
		
		reset: function(model) {
			this.model = model;
		}
	}))();
}());