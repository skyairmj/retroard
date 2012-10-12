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
            if ($.trim(this.textarea.val()) != '') {
				newSticky = new Sticky(this.targetSection, this.textarea.val());
				Connection.sendMessage(newSticky.toSaveParam());
				new StickyView({model: newSticky}).render();
            }
            this.textarea.val('');
		},
		
		target: function(targetSection) {
			this.targetSection = targetSection;
		}
	}))();
}());