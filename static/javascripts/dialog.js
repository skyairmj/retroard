StickyDialog = {
    initialize : function() {
        this.currentSticky = null;
        this.dom = $('#stickyDialog');
        this.cancelButton = this.dom.find('.cancelButton');
        this.okButton = this.dom.find('.okButton');
        this.modal = $('#modal');
        var that = this;
        this.cancelButton.on('click', function() {
            that.dom.hide();
            that.modal.hide();
            $('body').css('overflow', 'visible');
        });
        this.okButton.on('click', function() {
            that.dom.hide();
            that.modal.hide();
            $('body').css('overflow', 'visible');
            if(that.currentSticky != null) {
                that.currentSticky.update({
                    content : that.dom.find('textarea').text(),
                    status : 'normal'
                })
            }
        });
    },

    popUp : function(sticky) {
        this.currentSticky = sticky;
        this.dom.show();
        this.modal.show();
        $('body').css('overflow', 'hidden');
    }
}