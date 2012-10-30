(function(){
	StickyDialog = new (Backbone.View.extend({
		el: '#stickyDialog',
		
		events: {
			'click .cancelButton': 'reset',
			'click .okButton': 'add',
            'keyup textarea': 'type'
		},
		
		initialize: function(){
			this.textarea = this.$('textarea');
            this.okButton = this.$('.okButton');
            this.inputCount = this.$('.input-count')
		},
		
		reset: function() {
			this.textarea.val('');
            this.inputCount.text(140);
		},
	
		add: function() {
			var content = $.trim(this.textarea.val());
            if (!!content) {
				newSticky = new Sticky(this.targetSection.title, content);
				Connection.createSticky(newSticky);
                this.targetSection.add(new StickyView({model: newSticky}).render());
            }
            this.reset();
		},
        
        type: function (event) {
            this.inputCount.text(140 - event.srcElement.textLength);
            if (parseInt(this.inputCount.text()) < 0) {
                this.okButton.attr('disabled', 'disabled');
            } else {
                this.okButton.removeAttr('disabled');
            }
        },
		
		target: function(targetSection) {
			this.targetSection = targetSection;
		}
	}))();
}());