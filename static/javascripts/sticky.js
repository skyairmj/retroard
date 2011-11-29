var Sticky = (function() {
    function Sticky() {
        this.content = '';
        this.status = 'modifying';
    }

    Sticky.prototype.popUpStickyDialog = function() {
        $('#stickyDialog').show();
    }

    return Sticky;
})();