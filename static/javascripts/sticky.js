var Sticky = (function() {
    function Sticky() {
        this.content = '';
        this.status = 'modifying';
        this.popUpStickyDialog();
        var template = '<div class="sticky">'
                        + '<div class="stickyText"></div>'
                        + '<div class="stickyCount"></div>'
                    + '</div>';
        this.dom = $(template);
    }

    Sticky.prototype.popUpStickyDialog = function() {
        $('#stickyDialog').show();
        $('#modal').show();
        $('body').css('overflow', 'hidden');
    }

    Sticky.prototype.update = function(option) {
        var content = option.content;
        this.content = content;
        this.status = option.status;
        this.dom.find('.stickyText').text(content);
    }

    return Sticky;
})();