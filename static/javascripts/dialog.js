StickyDialog = (function() {
    var modal;
    var dom;
    function StickyDialog() {
        this.dom = $('#stickyDialog');
        dom = this.dom;
        this.cancelButton = $('#stickyDialog .cancelButton');
        this.okButton = $('#stickyDialog .okButton');
        this.modal = $('#modal');
        modal = this.modal;
    }

    StickyDialog.prototype.initialize = function() {
        this.cancelButton.on('click', function() {
            dom.hide();
            modal.hide();
        });
        this.okButton.on('click', function() {
            dom.hide();
            modal.hide();
        });
    }

    StickyDialog.prototype.display = function() {
        dom.show();
        modal.show();
    }

    return StickyDialog;
})();