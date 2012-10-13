(function(){
	Sticky = Backbone.Model.extend({	    
		initialize: function(section, content, uuid) {
			this.section = section;
			this.team = window.teamName;
			uuid = uuid || Utilities.generateUUID();
			content = content || '';
	        this.content = content;
	        this.uuid = uuid;
	        this.lastModified = '';
	    },
		
		toJSON: function() {
			return {
				'section': this.section,
                'uuid': this.uuid,
                'lastModified': this.lastModified,
                'content': this.content,
                'teamName': this.team
            };
		}
	});
	
	Stickies = Backbone.Collection.extend({
		model: Sticky,
		
	});
	
	StickyGroup = Backbone.Model.extend({
		initialize: function(section, content, uuid) {
			this.section = section;
			this.content = $.isArray(content)?content:[content||''];
	        this.uuid = uuid || Utilities.generateUUID();
	        this.lastModified = '';
	    },
	
		append: function(content, uuid){
			$.merge(this.content, content.split('------'));
			return this;
		}
	});
	
	StickyView = Backbone.View.extend({
		className: "sticky sticky-single",
		template: _.template('<div class="stickyTop"><i></i></div><div class="stickyText"><%=content%></div>'),
		
		initialize: function() {
			this.$el.attr('data-uuid', this.model.uuid);
			this.$el.html(this.template({content: this.model.content}));
			$('#'+this.model.section).find('.sectionBody').append(this.$el);
		},
		render: function(){
			var that = this;
			this.$el.draggable({
	            revert: "invalid",
				containment: "#sections",
	            cursor: "move"
	        });
			this.$el.droppable({
				accept: ".sticky",
	            drop: function( event, ui ) {
					var uuid = null;
					if (!!ui.draggable.filter('.sticky-multi').length) {
						uuid = ui.draggable.filter('.sticky-multi').first().data('uuid');
					} else if (!!$(this).filter('.sticky-multi').length){
						uuid = $(this).filter('.sticky-multi').first().data('uuid');
					}
					groupView = new StickyGroupView({model:new StickyGroup(that.model.section, that.model.content, uuid).append(ui.draggable.find('.stickyText').text())}).render();
					$(this).before(groupView.el);
					$(this).remove();
					ui.draggable.remove();
	            }
			});
			return this;
		}
	});
	
	StickyGroupView = Backbone.View.extend({
		className: "sticky sticky-multi",
		template: _.template('<div class="stickyTop"><i></i></div><div class="stickyText"><%=content%></div>'),
		
		initialize: function() {
			this.$el.attr('data-uuid', this.model.uuid);
			this.$el.html(this.template({content: this.model.content.join('<br>------<br>')}));
		},
		
		render: function(){
			var that = this;
			this.$el.draggable({
	            revert: "invalid",
				containment: "#sections",
	            cursor: "move"
	        });
			this.$el.droppable({
				accept: ".sticky",
	            drop: function( event, ui ) {
					var uuid = null;
					if (!!ui.draggable.filter('.sticky-multi').length) {
						uuid = ui.draggable.filter('.sticky-multi').first().data('uuid');
					} else if (!!$(this).filter('.sticky-multi').length){
						uuid = $(this).filter('.sticky-multi').first().data('uuid');
					}
					groupView = new StickyGroupView({model:new StickyGroup(that.model.section, that.model.content, uuid).append(ui.draggable.find('.stickyText').text())}).render();
					$(this).before(groupView.el);
					$(this).remove();
					ui.draggable.remove();
	            }
			});
			return this;
		}
	});
}());