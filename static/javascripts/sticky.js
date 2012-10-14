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
	
		getContent: function() {
			return this.content;
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
		initialize: function(modelDropped, modelDroppee) {
			this.section = modelDropped.section;
			this.team = window.teamName;
			if(modelDropped instanceof StickyGroup) {
				this.uuid = modelDropped.uuid;
			} else if(modelDroppee instanceof StickyGroup) {
				this.uuid = modelDroppee.uuid;
			} else {
				this.uuid = Utilities.generateUUID();
			}
			this.stickies = (modelDropped instanceof StickyGroup)? modelDropped.stickies:[modelDropped];			
			$.merge(this.stickies, (modelDroppee instanceof StickyGroup)?modelDroppee.stickies:[modelDroppee]);
	        this.lastModified = '';
	    },
		
		getContent: function() {
			return $.map(this.stickies, function(value) {return value.getContent();}).join('<br>-----<br>');
		},
		
		toJSON: function() {
			var stickyIds = $.map(this.stickies, function(value) {return value.uuid;});
			return {
				'section': this.section,
				'uuid': this.uuid,
				'teamName': this.team,
				'lastModified': this.lastModified,
				'stickies': stickyIds
			}
		}
	});
	
	StickyView = Backbone.View.extend({
		className: "sticky sticky-single",
		template: _.template('<div class="stickyTop"><i></i></div><div class="stickyText"><%=content%></div>'),
		events: { 
			'dropped': 'handleDropped',
			'accepted': 'handleAccepted'
		},
		
		initialize: function() {
			this.$el.attr('data-uuid', this.model.uuid);
			this.$el.data('model', this.model);
			this.$el.html(this.template({content: this.model.getContent()}));
			$('#'+this.model.section).find('.sectionBody').append(this.$el);
		},
		
		render: function() {
			var that = this;
			this.$el.draggable({
	            revert: "invalid",
				containment: "#sections",
	            cursor: "move"
	        });
			this.$el.droppable({
				accept: ".sticky",
	            drop: function( event, ui ) {
					var stickyGroup = new StickyGroup(that.model, ui.draggable.data('model'));
					var groupView = new StickyGroupView({model:stickyGroup}).render();
					$(this).before(groupView.el);
					$(this).trigger('accepted');
					ui.draggable.trigger('dropped');
	            }
			});
			return this;
		},
		
		handleDropped: function() {
			this.remove();
		},
		
		handleAccepted: function() {
			this.remove();
		}
	});
	
	StickyGroupView = Backbone.View.extend({
		className: "sticky sticky-multi",
		template: _.template('<div class="stickyTop"><i></i></div><div class="stickyText"><%=content%></div>'),
		events: { 
			'dropped': 'handleDropped',
			'accepted': 'handleAccepted'
		},
		
		initialize: function() {
			this.$el.attr('data-uuid', this.model.uuid);
			this.$el.data('model', this.model);
			this.$el.html(this.template({content: this.model.getContent()}));
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
					var stickyGroup = new StickyGroup(that.model, ui.draggable.data('model'));
					var groupView = new StickyGroupView({model:stickyGroup}).render();
					$(this).before(groupView.el);
					$(this).trigger('accepted');
					ui.draggable.trigger('dropped');
	            }
			});
			return this;
		},
		
		handleDropped: function() {
			this.remove();
		},

		handleAccepted: function() {
			this.remove();
		}
	});
}());