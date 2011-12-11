StickyDialog = (function() {
    var that;
    function StickyDialog() {
        that = this;
        this.dom = $('#stickyDialog');
        var dom = this.dom;
        this.cancelButton = this.dom.find('.cancelButton');
        this.okButton = this.dom.find('.okButton');
        this.modal = $('#modal');
    }

    StickyDialog.prototype.initialize = function() {
        this.cancelButton.on('click', function() {
            that.dom.hide();
            that.modal.hide();
            $('body').css('overflow', 'visible');
        });
        this.okButton.on('click', function() {
            that.dom.hide();
            that.modal.hide();
            $('body').css('overflow', 'visible');
        });
    }

    return StickyDialog;
})();