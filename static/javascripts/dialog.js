(function(){
	var StickyDialog = Backbone.Model.extend({
	    hideStickyDialog: function(stickyDialog) {
	        stickyDialog.dom.hide();
	        stickyDialog.modal.hide();
	        $('body').css('overflow', 'visible');
	    },

	    bindEvents: function(stickyDialog) {
	        stickyDialog.cancelButton.on('click', function() {
	            hideStickyDialog(stickyDialog);
	            if (stickyDialog.currentSticky != null) {
	                stickyDialog.currentSticky.remove();
	            }
	        });
	        stickyDialog.okButton.on('click', function() {
	            hideStickyDialog(stickyDialog);
	            if (stickyDialog.currentSticky != null) {
	                stickyDialog.currentSticky.update({
	                    content: stickyDialog.dom.find('textarea').val()
	                });
					Connection.sendMessage(stickyDialog.currentSticky.dataToSent());
	                stickyDialog.dom.find('textarea').val('');
	            }
	        });
	    },

        initialize : function() {
            this.currentSticky = null;
            this.dom = $('#stickyDialog');
            this.cancelButton = this.dom.find('.cancelButton');
            this.okButton = this.dom.find('.okButton');
            this.modal = $('#modal');
            bindEvents(this);
        },

        popUp : function(sticky) {
            this.currentSticky = sticky;
            this.dom.show();
            this.modal.show();
            $('body').css('overflow', 'hidden');
        }
	});
}());