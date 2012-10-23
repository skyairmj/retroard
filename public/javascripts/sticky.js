(function(){
    Sticky = Backbone.Model.extend({        
        initialize: function(category, content, uuid, voteCount) {
            this.category = category;
            this.content = content || '';
            this.uuid = uuid || UUID.v4();
            this.stickies = [];
            this.voteCount = voteCount || 0;
        },
        
        append: function(sticky){
            this.newSubordinate = sticky;
            $.merge(this.stickies, [sticky]);
            if(!!sticky.stickies.length) {
                $.merge(this.stickies, sticky.stickies);
                sticky.stickies.length = 0;
            }
            this.voteCount += sticky.voteCount;
        },
        
        vote: function(){
            this.set({voteCount: this.voteCount++})
        }
    });
    
    StickyView = Backbone.View.extend({
        className: "sticky sticky-single",
        template: _.template('<div class="stickyTop"></div><div class="stickyText"><%=content%></div>'),
        
        initialize: function() {
            this.$el.attr('data-uuid', this.model.uuid);
            this.$el.data('view', this);
            this.$el.html(this.template({content: this.model.content}));
            this.model.on('change:voteCount', this.raiseVotes, this);
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
                    that.accept(ui.draggable.data('view'));
                    Connection.updateSticky(that.model);
                }
            });
            return this;
        },
        
        accept: function(thatView) {
            this.model.append(thatView.model);
            var groupView = new StickyGroupView({model:this.model}).render();
            this.$el.before(groupView.el);
            this.remove();
            thatView.remove();
        },
        
        vote: function() {
            this.model.vote();
            Connection.updateSticky2(this.model);
        },
        
        raiseVotes: function() {
            this.$('span.like-count').text(this.model.voteCount);
        }
    });
    
    StickyGroupView = Backbone.View.extend({
        className: "sticky sticky-multi",
        
        template: _.template('<div class="stickyTop"><s></s><div class="sticky-like"><i class="icon-thumbs-up"></i><span class="like-count"><%=voteCount%></span></div></div><div class="stickyText"></div>'),
        eachTemplate: _.template('<span><%=content%></span>'),
        
        events: {
            'click .icon-thumbs-up': 'vote'
        },
        
        initialize: function() {
            this.$el.attr('data-uuid', this.model.uuid);
            this.$el.data('view', this);
            this.$el.html(this.template({voteCount: this.model.voteCount}));
            var that = this;
            that.$('div.stickyText').append(this.eachTemplate({content: this.model.content}))
            $.each(this.model.stickies, function(index, sticky){
                that.$('div.stickyText').append(that.eachTemplate({content: sticky.content}))
            });
            this.model.on('change:voteCount', this.raiseVotes, this);
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
                    that.accept(ui.draggable.data('view'));
                    Connection.updateSticky(that.model);
                }
            });
            return this;
        },
        
        accept: function(thatView) {
            this.model.append(thatView.model);
            var groupView = new StickyGroupView({model:this.model}).render();
            this.$el.before(groupView.el);
            this.remove();
            thatView.remove();
        },
        
        vote: function() {
            this.model.vote();
            Connection.updateSticky2(this.model);
        },
        
        raiseVotes: function() {
            this.$('span.like-count').text(this.model.voteCount);
        }
    });
}());