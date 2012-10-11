(function(){
	Sticky = Backbone.Model.extend({
		template: _.template('<div class="sticky sticky-single"><div class="stickyText"><%=content%></div></div>'),
	    initialize: function(uuid, content, section) {
			this.section = section;
	        this.content = '';
	        this.status = 'modifying';
	        this.lastModified = '';
	        this.uuid = uuid;
	        this.dom = $(this.template({content:content}));
			this.dom.draggable({
	            revert: "invalid", // when not dropped, the item will revert back to its initial position
				containment: "#sections",
	            cursor: "move"
	        });
			this.dom.droppable({
				accept: ".sticky",
	            drop: function( event, ui ) {
					//new StickyGroupView({model:this.model}).render()
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
	    }

	});
	
	StickyView = Backbone.View.extend({
		template: _.template('<div class="sticky"><div class="stickyText"><%=content%></div></div>'),
		initialize: function(option){
			this.model = option.model;
			this.onRemove = option.onRemove;
		}
	});
	
	StickyGroupView = Backbone.View.extend({
		template: _.template('<div class="sticky sticky-multi"><div class="stickyText"><%=content%></div></div>'),
		
		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			
		}
	});
}());