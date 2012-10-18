(function(){
    Sticky = Backbone.Model.extend({        
        initialize: function(category, content, uuid) {
            this.category = category;
            this.content = content || '';
            this.uuid = uuid || UUID.v4();
            this.stickies = [];
        },
        
        append: function(sticky){
            this.newSubordinate = sticky;
            $.merge(this.stickies, [sticky]);
            if(!!sticky.stickies.length) {
                $.merge(this.stickies, sticky.stickies);
                sticky.stickies.length = 0;
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
                    that.model.append(ui.draggable.data('model'));
                    Connection.updateSticky(that.model);
                    var groupView = new StickyGroupView({model:that.model}).render();
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
            that.$('div.stickyText').append(this.eachTemplate({content: this.model.content}))
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
                    that.model.append(ui.draggable.data('model'));
                    Connection.updateSticky(that.model);
                    var groupView = new StickyGroupView({model:that.model}).render();
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