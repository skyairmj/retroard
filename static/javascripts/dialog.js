StickyDialog = (function() {
    var that;
    function StickyDialog() {
        that = this;
        this.dom = $('#stickyDialog');
        var dom = this.dom;
        this.cancelButton = $('#stickyDialog .cancelButton');
        this.okButton = $('#stickyDialog .okButton');
        this.modal = $('#modal');
        var modal = this.modal;
    }

    StickyDialog.prototype.initialize = function() {
        this.cancelButton.on('click', function() {
            that.dom.hide();
            that.modal.hide();
        });
        this.okButton.on('click', function() {
            that.dom.hide();
            that.modal.hide();
        });
    }

    StickyDialog.prototype.display = function() {
        that.dom.show();
        that.modal.show();
    }

    return StickyDialog;
})();