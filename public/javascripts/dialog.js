(function(){
	StickyDialog = new (Backbone.View.extend({
		el: '#stickyDialog',
		
		events: {
			'click .cancelButton': 'cancel',
			'click .okButton': 'add',
            'keypress textarea': 'type'
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
                this.targetSection.add(new StickyView({model: newSticky}).render());
            }
            this.textarea.val('');
		},
        
        type: function (event) {
            this.$('.count').text(139 - event.srcElement.textLength);
            if (parseInt(this.$('.count').text()) < 0) {
                this.$('.okButton').attr('disabled', 'disabled');
            } else {
                this.$('.okButton').removeAttr('disabled');
            }
            
        },
		
		target: function(targetSection) {
			this.targetSection = targetSection;
		}
	}))();
}());