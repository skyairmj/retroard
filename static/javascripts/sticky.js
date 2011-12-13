var Sticky = (function() {
    function Sticky(onRemove) {
        this.content = '';
        this.onRemove = onRemove;
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

    Sticky.prototype.remove = function() {
        this.dom.remove();
        this.onRemove();
    }

    return Sticky;
})();