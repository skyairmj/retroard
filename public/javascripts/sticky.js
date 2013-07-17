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
        template: _.template('<div class="sticky-header"><div class="sticky-vote btn btn-success"><i class="icon-thumbs-up icon-white"></i> Vote</div><!--a class="sticky-action-btn btn btn-primary" data-original-title="What action shall we take?" data-type="text"><i class="icon-ok-sign icon-white"></i> Action</a--><span class="like-count badge badge-success"><%=voteCount%></span></div><div class="sticky-body"><%=content%></div><div class="sticky-action-group"><!--div class="sticky-action">this is an action</div></div-->'),
        
        events: {
            'click .sticky-vote': 'vote',
            'click .sticky-action-btn': 'comment'
        },
        
        initialize: function(options) {
            this.$el.attr('data-uuid', this.model.uuid);
            this.$el.data('view', this);
            this.$el.html(this.template({voteCount: this.model.voteCount, content: this.model.content}));
            this.model.on('change:voteCount', this.raiseVotes, this);
            this.isSynchronized = options.isSynchronized;
        },
        
        render: function() {
            var that = this;
            this.$('.sticky-action').editable({
                type:  'textarea',
                name:  'comments',
                toggle: 'manual',
                title: 'Enter comments'
            });
            this.$el.draggable({
                revert: "invalid",
                containment: "#sections",
                cursor: "move",
                drag: function(event, ui) {
                    ui.helper.css('z-index', 100)
                },
                stop: function(event, ui) {
                    ui.helper.css('z-index', 2)
                }
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
        },
        
        comment: function(e) {
            e.stopPropagation();
            this.$('.sticky-action').editable('show');
        }
    });
    
    StickyGroupView = Backbone.View.extend({
        className: "sticky sticky-multi",
        
        template: _.template('<div class="sticky-header"><s></s><div class="sticky-vote btn btn-success"><i class="icon-thumbs-up icon-white"></i> Vote</div><!--a class="sticky-action-btn btn btn-primary" data-original-title="What action shall we take?" data-type="text"><i class="icon-ok-sign icon-white"></i> Action</a--><span class="like-count badge badge-success"><%=voteCount%></span></div><div class="sticky-body"></div><!--div class="sticky-action-group"><div class="sticky-action">this is an action<br>this is an action<br>this is an action<br>this is an action<br>this is an action<br>this is an action<br></div></div-->'),
        eachTemplate: _.template('<span><%=content%></span>'),
        
        events: {
            'click .sticky-vote': 'vote',
            'click .sticky-action-btn': 'comment'
        },
        
        initialize: function() {
            this.$el.attr('data-uuid', this.model.uuid);
            this.$el.data('view', this);
            this.$el.html(this.template({voteCount: this.model.voteCount}));
            this.$('div.sticky-body').append(this.eachTemplate({content: this.model.content}))
            var that = this;
            $.each(this.model.stickies, function(index, sticky){
                that.$('div.sticky-body').append(that.eachTemplate({content: sticky.content}))
            });
            this.model.on('change:voteCount', this.raiseVotes, this);
        },
        
        render: function(){
            var that = this;
            this.$('.sticky-action').editable({
                type:  'textarea',
                name:  'comments',
                toggle: 'manual',
                title: 'Enter comments'
            });
            this.$('.sticky-action').editable({
                type:  'textarea',
                name:  'comments',
                title: 'Enter comments'
            });
            this.$el.draggable({
                revert: "invalid",
                containment: "#sections",
                cursor: "move",
                drag: function(event, ui) {
                    ui.helper.css('z-index', 100)
                },
                stop: function(event, ui) {
                    ui.helper.css('z-index', 2)
                }
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
        },
        
        comment: function(e) {
            e.stopPropagation();
            this.$('.sticky-action').editable('show');
        }
    });
}());