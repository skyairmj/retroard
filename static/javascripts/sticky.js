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

		toSaveParam: function() {
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
	
		render: function(){
			this.$el.html($(this.template({content: this.model.content})));
			this.$el.draggable({
	            revert: "invalid",
				containment: "#sections",
	            cursor: "move"
	        }).droppable({
				accept: ".sticky",
	            drop: function( event, ui ) {
					new StickyGroupView({model:this.model}).render()
	            }
			});
			$('#'+this.model.section).find('.sectionBody').append(this.$el);
		}
	});
	
	StickyGroupView = Backbone.View.extend({
		template: _.template('<div class="sticky sticky-multi"><div class="stickyText"><%=content%></div></div>'),
		
		render: function(){
			this.$el.html(this.template({content: this.model.content}));
			
		}
	});
}());