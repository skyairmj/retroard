(function(){
	StickerDialog = new (Backbone.View.extend({
        MAX_LENGTH: 140,
		el: '#stickerDialog',
		
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
            this.inputCount.text(this.MAX_LENGTH);
		},
	
		add: function() {
			var content = Utils.stripScript($.trim(this.textarea.val()));
            if (!!content) {
				newSticker = new Sticker(this.targetSection.title, content);
				Connection.createSticker(newSticker);
                this.targetSection.add(new StickerView({model: newSticker}).render());
                MessageBox.append(new SuccessMessage({message: 'You added a new sticker under "'+this.targetSection.title+'".'}).render())
            }
            this.reset();
		},
        
        type: function (event) {
            this.inputCount.text(this.MAX_LENGTH - this.textarea.val().length);
            if (parseInt(this.inputCount.text()) < 0) {
                this.okButton.attr('disabled', 'disabled');
                this.okButton.prop("disabled", true);
            } else {
                this.okButton.removeAttr('disabled');
                this.okButton.prop("disabled", false);
            }
        },
		
		target: function(targetSection) {
			this.targetSection = targetSection;
		}
	}))();
}());