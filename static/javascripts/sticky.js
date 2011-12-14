var Sticky = (function() {
    function Sticky(onRemove) {
        this.content = '';
        this.onRemove = onRemove;
        this.status = 'modifying';
        this.lastModified = '';
        this.uuid = Utilities.generateUUID();
        var template = '<div class="sticky" id="newSticky">'
                        + '<div class="stickyText"></div>'
                        + '<div class="stickyCount"></div>'
                    + '</div>';
        this.dom = $(template);
        StickyDialog.popUp(this);
    }

    Sticky.prototype.update = function(option) {
        var content = option.content;
        var lastModified = this.lastModified;
        var uuid = this.uuid;
        this.content = content;
        this.status = option.status;
        this.dom.find('.stickyText').text(content);
        if(option.lastModified) {
            this.lastModified = option.lastModified;
        }
        if(Connection.socket) {
            Connection.sendMessage({
            'class': 'sticky',
                'status': 'post',
                'data': {
                    'uuid': uuid,
                    'lastModified': lastModified,
                    'content': content
                }
            });
        }
    }

    Sticky.prototype.remove = function() {
        this.dom.remove();
        this.onRemove();
    }

    return Sticky;
})();