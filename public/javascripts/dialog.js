(function(){
	StickyDialog = new (Backbone.View.extend({
		el: '#stickyDialog',
		
		events: {
			'click .cancelButton': 'cancel',
			'click .okButton': 'add'
		},
		
		initialize: function(){
			this.textarea = this.$('textarea');
		},
		
		cancel: function() {
			this.textarea.val('');
		},
	
		add: function() {
			var content = $.trim(this.textarea.val());
            if (!!content) {
				newSticky = new Sticky(this.targetSection.title, content);
				Connection.createSticky(newSticky);
//				new StickyView({model: newSticky}).render();
            }
            this.textarea.val('');
		},
		
		target: function(targetSection) {
			this.targetSection = targetSection;
		}
	}))();
}());