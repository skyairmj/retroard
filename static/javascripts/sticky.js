var Sticky = (function() {
    function Sticky() {
        this.addStickyButton = $('.addSticky');
        this.bindEvents();

        this.addStickyDialog = new AddStickyDialog();
    }

    Sticky.prototype.bindEvents = function() {
        var me = this;
        this.addStickyButton.on('click', function() {
            me.addStickyDialog.dom.show();
            me.addStickyDialog.modal.show();
        });
    }

    return Sticky;
})();

AddStickyDialog = (function() {
    function AddStickyDialog() {
        this.dom = $('#dialogAddSticky');
        this.cancelButton = $('#dialogAddSticky .cancelButton');
        this.okButton = $('#dialogAddSticky .okButton');
        this.modal = $('#modal');
        this.bindEvents();
    }

    AddStickyDialog.prototype.bindEvents = function() {
        var me = this;
        this.cancelButton.on('click', function() {
            me.dom.hide();
            me.modal.hide();
        });
        this.okButton.on('click', function() {
            me.dom.hide();
            me.modal.hide();
        });
    }

    return AddStickyDialog;
})();


$(document).ready(function() {
    var sticky = new Sticky();
});