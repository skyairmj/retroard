(function(){
	Sticky = Backbone.Model.extend({	    
		initialize: function(section, content, uuid) {
			this.section = section;
			uuid = uuid || Utilities.generateUUID();
			content = content || '';
	        this.content = content;
	        this.uuid = uuid;
	        this.lastModified = '';
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
	
	StickyGroup = Backbone.Model.extend({
		initialize: function(section, content, uuid) {
			this.section = section;
			this.content = $.isArray(content)?content:[content||''];
	        this.uuid = uuid || Utilities.generateUUID();
	        this.lastModified = '';
	    },
	
		append: function(content){
			$.merge(this.content, content.split('------'));
			return this;
		}
	});
	
	StickyView = Backbone.View.extend({
		template: _.template('<div class="sticky sticky-single" id="<%=id%>"><div class="stickyTop"><i></i></div><div class="stickyText"><%=content%></div></div>'),
	
		render: function(){
			this.dom = $(this.template({id:this.model.uuid, content: this.model.content}));
			$('#'+this.model.section).find('.sectionBody').append(this.dom);

			var that = this;
			this.dom.draggable({
	            revert: "invalid",
				containment: "#sections",
	            cursor: "move"
	        }).droppable({
				accept: ".sticky",
	            drop: function( event, ui ) {
					var uuid = null;
					if (!!ui.draggable.filter('.sticky-multi').length) {
						uuid = ui.draggable.filter('.sticky-multi').first().attr('id');
					} else if (!!$(this).filter('.sticky-multi').length){
						uuid = $(this).filter('.sticky-multi').first().attr('id');
					}
					groupView = new StickyGroupView({model:new StickyGroup(that.model.section, that.model.content, uuid).append(ui.draggable.find('.stickyText').text())}).render();
					$('#'+that.model.uuid).before(groupView.dom);
					$(this).remove();
					ui.draggable.remove();
	            }
			});
		}
	});
	
	StickyGroupView = Backbone.View.extend({
		template: _.template('<div class="sticky sticky-multi" id="<%=id%>"><div class="stickyTop"><i></i></div><div class="stickyText"><%=content%></div></div>'),
		
		render: function(){
			this.dom = $(this.template({id:this.model.uuid, content: this.model.content.join('<br>------<br>')}));
			
			var that = this;
			this.dom.draggable({
	            revert: "invalid",
				containment: "#sections",
	            cursor: "move"
	        }).droppable({
				accept: ".sticky-single",
	            drop: function( event, ui ) {
					var uuid = null;
					if (!!ui.draggable.filter('.sticky-multi').length) {
						uuid = ui.draggable.filter('.sticky-multi').first().attr('id');
					} else if (!!$(this).filter('.sticky-multi').length){
						uuid = $(this).filter('.sticky-multi').first().attr('id');
					}
					groupView = new StickyGroupView({model:new StickyGroup(that.model.section, that.model.content, uuid).append(ui.draggable.find('.stickyText').text())}).render();
					$('#'+that.model.uuid).before(groupView.dom);
					$(this).remove();
					ui.draggable.remove();
	            }
			});
			return this;
		}
	});
}());