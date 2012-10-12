(function(){
	Sticky = Backbone.Model.extend({	    
		initialize: function(uuid, content, section) {
			this.section = section;
	        this.content = content;
	        this.status = 'modifying';
	        this.lastModified = '';
	        this.uuid = uuid;
	    },

	    update: function(option) {
	        var content = option.content;
	        this.content = content;
	        this.status = option.status;
	        this.lastModified = option.lastModified;
	    },

		toJSON: function() {
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
		}
	});
	
	StickyView = Backbone.View.extend({
		template: _.template('<div class="sticky sticky-single"><div class="stickyText"><%=content%></div></div>'),
		initialize: function(option) {
			this.model = option.model;
			this.model.on('change:content', this.update, this);
	        this.dom = $(this.template({content: this.model.content}));
			this.stickyText = this.dom.find('.stickyText');
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
			$('#'+this.model.section).find('.sectionBody').append(this.dom);
	    },

	    update: function(option) {
	        this.stickyText.text(content);
	    },
	
		render: function(){
		},

	    remove: function() {
	        this.dom.remove();
	    }
	});
	
	StickyGroupView = Backbone.View.extend({
		template: _.template('<div class="sticky sticky-multi"><div class="stickyText"><%=content%></div></div>'),
		
		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			
		}
	});
}());