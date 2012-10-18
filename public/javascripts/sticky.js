(function(){
    Sticky = Backbone.Model.extend({        
        initialize: function(category, content, uuid) {
            this.category = category;
            this.content = content || '';
            this.uuid = uuid || UUID.v4();
        },
        
        toJSON: function() {
            return {
                'uuid': this.uuid,
                'content': this.content
            };
        }
    });
    
    Stickies = Backbone.Collection.extend({
        model: Sticky,
    });
    
    StickyGroup = Backbone.Model.extend({
        initialize: function(modelDropped, modelDroppee) {
            this.category = modelDropped.category;
            if(modelDropped instanceof StickyGroup) {
                this.uuid = modelDropped.uuid;
            } else if(modelDroppee instanceof StickyGroup) {
                this.uuid = modelDroppee.uuid;
            } else {
                this.uuid = UUID.v4();
            }
            this.stickies = (modelDropped instanceof StickyGroup)? modelDropped.stickies:[modelDropped];            
            $.merge(this.stickies, (modelDroppee instanceof StickyGroup)?modelDroppee.stickies:[modelDroppee]);
        },
        
        toJSON: function() {
            var stickyIds = $.map(this.stickies, function(value) {return value.uuid;});
            return {
                'category': this.category,
                'uuid': this.uuid,
                'retrospectiveId': this.retroId,
                'stickies': stickyIds
            }
        }
    });
    
    StickyView = Backbone.View.extend({
        className: "sticky sticky-single",
        template: _.template('<div class="stickyTop"></div><div class="stickyText"><%=content%></div>'),
        events: { 
            'dropped': 'handleDropped',
            'accepted': 'handleAccepted'
        },
        
        initialize: function() {
            this.$el.attr('data-uuid', this.model.uuid);
            this.$el.data('model', this.model);
            this.$el.html(this.template({content: this.model.content}));
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
        
        template: _.template('<div class="stickyTop"><s></s><div class="sticky-like"><i class="icon-thumbs-up"></i></div></div><div class="stickyText"></div>'),
        eachTemplate: _.template('<span><%=content%></span>'),
        
        events: {
            'dropped': 'handleDropped',
            'accepted': 'handleAccepted'
        },
        
        initialize: function() {
            this.$el.attr('data-uuid', this.model.uuid);
            this.$el.data('model', this.model);
            this.$el.html(this.template());
            var that = this;
            $.each(this.model.stickies, function(index, sticky){
                that.$('div.stickyText').append(that.eachTemplate({content: sticky.content}))
            });
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