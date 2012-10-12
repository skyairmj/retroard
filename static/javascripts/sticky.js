(function(){
	Sticky = Backbone.Model.extend({	    
		initialize: function(section, content, uuid) {
			this.section = section;
			uuid = uuid || Utilities.generateUUID();
			content = content || '';
	        this.content = content;
	        this.uuid = uuid;
	        this.status = 'modifying';
	        this.lastModified = '';
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
		template: _.template('<div class="sticky sticky-single" id="<%=id%>"><div class="stickyText"><%=content%></div></div>'),
	
		render: function(){
			this.$el.html($(this.template({id:this.model.uuid, content: this.model.content})));
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
		template: _.template('<div class="sticky sticky-multi" id="<%=id%>"><div class="stickyText"><%=content%></div></div>'),
		
		render: function(){
			this.$el.html(this.template({id:this.model.uuid, content: this.model.content}));
			
		}
	});
}());