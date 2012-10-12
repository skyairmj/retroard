(function(){
	StickyDialog = new (Backbone.View.extend({
		el: '#stickyDialog',
		
		events: {
			'click .okButton': 'add'
		},
		
		initialize: function(){
			this.textarea = this.$('textarea');
		},
	
		add: function() {
            if (this.model != null && $.trim(this.textarea.val()) != '') {
                this.model.update({
                    content: this.textarea.val()
                });
				Connection.sendMessage(this.model.toSaveParam());
				new StickyView({model: this.model}).render();
            }
            this.textarea.val('');
		},
		
		reset: function(model) {
			this.model = model;
		}
	}))();
}());