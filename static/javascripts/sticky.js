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
	            + '</div>';
	        this.dom = $(template);
			this.dom.draggable({
	            revert: "invalid", // when not dropped, the item will revert back to its initial position
				containment: "#sections",
	            cursor: "move"
	        });
			this.dom.droppable({
				accept: "div.sticky",
	            drop: function( event, ui ) {
	            }
			});
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
	
	StickyView = Backbone.View.extend({
		template: _.template('<div class="sticky"><div class="stickyText"><%=content%></div></div>'),
	});
}());