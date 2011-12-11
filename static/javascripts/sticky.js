var Sticky = (function() {
    function Sticky() {
        this.content = '';
        this.status = 'modifying';
        var template = '<div class="sticky" id="newSticky">'
                        + '<div class="stickyText"></div>'
                        + '<div class="stickyCount"></div>'
                    + '</div>';
        this.dom = $(template);
        StickyDialog.popUp(this);
    }

    Sticky.prototype.update = function(option) {
        var content = option.content;
        this.content = content;
        this.status = option.status;
        this.dom.find('.stickyText').text(content);
    }

    return Sticky;
})();