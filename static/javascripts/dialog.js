(function(){
	StickyDialog = new (Backbone.View.extend({
		el: '#stickyDialog',
		
		events: {
			'click .okButton': 'add'
		},
	
		add: function() {
            if (this.model != null && $.trim($(this.el).find('textarea').val()) != '') {
                this.model.update({
                    content: $(this.el).find('textarea').val()
                });
				Connection.sendMessage(this.model.toSaveParam());
				new StickyView({model: this.model})
            }
            $(this.el).find('textarea').val('');
		},
		
		reset: function(model) {
			this.model = model;
		}
	}))();
}());