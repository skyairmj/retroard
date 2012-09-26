(function(){
	Sticky = Backbone.Model.extend({
	    initialize: function(onRemove, uuid, section) {
			this.section = section;
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
	    },

	    update: function(option) {
	        var content = option.content;
	        this.content = content;
	        this.status = option.status;
	        this.dom.find('.stickyText').text(content);
	        this.lastModified = option.lastModified;
	    },

		dataToSent: function() {
			return $.toJSON({
	            'resource': 'sticky',
	            'method': 'save',
	            'data': {
					'section': this.section,
	                'uuid': this.uuid,
	                'lastModified': this.lastModified,
	                'content': this.content,
	                'teamName': window.teamName
	            }
	        });
		},

	    remove: function() {
	        this.dom.remove();
	        this.onRemove();
	    }

	});
}());