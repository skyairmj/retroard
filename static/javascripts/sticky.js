var Sticky = (function() {
    function Sticky(onRemove, uuid) {
        this.content = '';
        this.onRemove = onRemove;
        this.status = 'modifying';
        this.lastModified = '';
        this.uuid = uuid;
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
        if (option.lastModified) {
            this.lastModified = option.lastModified;
        }
        var sendData = $.toJSON({
            'resource': 'sticky',
            'method': 'save',
            'data': {
                'uuid': uuid,
                'lastModified': lastModified,
                'content': content
            }
        });
        console.log(sendData);
        Connection.sendMessage(sendData);
    }

    Sticky.prototype.remove = function() {
        this.dom.remove();
        this.onRemove();
    }

    return Sticky;
})();
