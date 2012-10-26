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
        template: _.template('<div class="stickyTop"><div class="sticky-like"><div class="sticky-vote"></div></div><span class="like-count"><%=voteCount%></span></div><div class="stickyText"><%=content%></div>'),
        
        events: {
            'click .sticky-like': 'vote'
        },
        
        initialize: function() {
            this.$el.attr('data-uuid', this.model.uuid);
            this.$el.data('view', this);
            this.$el.html(this.template({voteCount: this.model.voteCount, content: this.model.content}));
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
        
        template: _.template('<div class="stickyTop"><s></s><div class="sticky-like"><div class="sticky-vote"></div></div><span class="like-count"><%=voteCount%></span></div><div class="stickyText"></div>'),
        eachTemplate: _.template('<span><%=content%></span>'),
        
        events: {
            'click .sticky-like': 'vote'
        },
        
        initialize: function() {
            this.$el.attr('data-uuid', this.model.uuid);
            this.$el.data('view', this);
            this.$el.html(this.template({voteCount: this.model.voteCount}));
            this.$('div.stickyText').append(this.eachTemplate({content: this.model.content}))
            var that = this;
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