var Sticky = (function() {
    function Sticky() {
        this.content = '';
        this.status = 'modifying';
        this.popUpStickyDialog();
    }

    Sticky.prototype.popUpStickyDialog = function() {
        $('#stickyDialog').show();
        $('#modal').show();
    }

    return Sticky;
})();