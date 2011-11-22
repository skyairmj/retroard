Sticky = (function() {
    function Sticky() {
        this.addStickyButton = $('.addSticky');
        this.bindEvents();

        this.addStickyDialog = new AddStickyDialog();
    }

    Sticky.prototype.bindEvents = function() {
        var me = this;
        this.addStickyButton.on('click', function() {
            me.addStickyDialog.dom.show();
        });
    }

    return Sticky;
})();

AddStickyDialog = (function() {
    function AddStickyDialog() {
        this.dom = $('#dialogAddSticky');
        this.cancelButton = $('#dialogAddSticky .cancelButton');
        this.bindEvents();
    }

    AddStickyDialog.prototype.bindEvents = function() {
        var me = this;
        this.cancelButton.on('click', function() {
            console.log(1)
            me.dom.hide();
        });
    }

    return AddStickyDialog;
})();


$(document).ready(function() {
    var sticky = new Sticky();
});