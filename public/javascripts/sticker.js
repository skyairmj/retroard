(function(){
    Sticker = Backbone.Model.extend({        
        initialize: function(category, content, uuid, voteCount) {
            this.category = category;
            this.content = content || '';
            this.uuid = uuid || UUID.v4();
            this.stickies = [];
            this.voteCount = voteCount || 0;
        },
        
        append: function(sticker){
            this.newSubordinate = sticker;
            $.merge(this.stickies, [sticker]);
            if(!!sticker.stickies.length) {
                $.merge(this.stickies, sticker.stickies);
                sticker.stickies.length = 0;
            }
            this.voteCount += sticker.voteCount;
        },
        
        vote: function(){
            this.set({voteCount: this.voteCount++})
        }
    });
    
    StickerView = Backbone.View.extend({
        className: "sticker sticker-single",
        template: _.template('<div class="sticker-header"><div class="sticker-vote btn btn-success"><i class="icon-thumbs-up icon-white"></i> Vote</div><!--a class="sticker-action-btn btn btn-primary" data-original-title="What action shall we take?" data-type="text"><i class="icon-ok-sign icon-white"></i> Action</a--><span class="like-count badge badge-success"><%=voteCount%></span></div><div class="sticker-body"><%=content%></div><div class="sticker-action-group"><!--div class="sticker-action">this is an action</div></div-->'),
        
        events: {
            'click .sticker-vote': 'vote',
            'click .sticker-action-btn': 'comment'
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
            this.$('.sticker-action').editable({
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
                accept: ".sticker",
                drop: function( event, ui ) {
                    that.accept(ui.draggable.data('view'));
                    Connection.updateSticker(that.model);
                }
            });
            return this;
        },
        
        accept: function(thatView) {
            this.model.append(thatView.model);
            var groupView = new StickerGroupView({model:this.model}).render();
            this.$el.before(groupView.el);
            this.remove();
            thatView.remove();
            return groupView;
        },
        
        highlight: function() {
            for(i=0;i<3;i++) {
                this.$el.fadeTo('slow', 0.5).fadeTo('fast', 1.0);
            }
        },
        
        vote: function() {
            this.model.vote();
            Connection.updateSticker2(this.model);
        },
        
        raiseVotes: function() {
            this.$('span.like-count').text(this.model.voteCount);
        },
        
        comment: function(e) {
            e.stopPropagation();
            this.$('.sticker-action').editable('show');
        }
    });
    
    StickerGroupView = Backbone.View.extend({
        className: "sticker sticker-multi",
        
        template: _.template('<div class="sticker-header"><s></s><div class="sticker-vote btn btn-success"><i class="icon-thumbs-up icon-white"></i> Vote</div><!--a class="sticker-action-btn btn btn-primary" data-original-title="What action shall we take?" data-type="text"><i class="icon-ok-sign icon-white"></i> Action</a--><span class="like-count badge badge-success"><%=voteCount%></span></div><div class="sticker-body"></div><!--div class="sticker-action-group"><div class="sticker-action">this is an action<br>this is an action<br>this is an action<br>this is an action<br>this is an action<br>this is an action<br></div></div-->'),
        eachTemplate: _.template('<span><%=content%></span>'),
        
        events: {
            'click .sticker-vote': 'vote',
            'click .sticker-action-btn': 'comment'
        },
        
        initialize: function() {
            this.$el.attr('data-uuid', this.model.uuid);
            this.$el.data('view', this);
            this.$el.html(this.template({voteCount: this.model.voteCount}));
            this.$('div.sticker-body').append(this.eachTemplate({content: this.model.content}))
            var that = this;
            $.each(this.model.stickies, function(index, sticker){
                that.$('div.sticker-body').append(that.eachTemplate({content: sticker.content}))
            });
            this.model.on('change:voteCount', this.raiseVotes, this);
        },
        
        render: function(){
            var that = this;
            this.$('.sticker-action').editable({
                type:  'textarea',
                name:  'comments',
                toggle: 'manual',
                title: 'Enter comments'
            });
            this.$('.sticker-action').editable({
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
                accept: ".sticker",
                drop: function( event, ui ) {
                    that.accept(ui.draggable.data('view'));
                    Connection.updateSticker(that.model);
                }
            });
            return this;
        },
        
        accept: function(thatView) {
            this.model.append(thatView.model);
            var groupView = new StickerGroupView({model:this.model}).render();
            this.$el.before(groupView.el);
            this.remove();
            thatView.remove();
            return groupView;
        },
        
        highlight: function() {
            for(i=0;i<3;i++) {
                this.$el.fadeTo('slow', 0.5).fadeTo('slow', 1.0);
            }
        },
        
        vote: function() {
            this.model.vote();
            Connection.updateSticker2(this.model);
        },
        
        raiseVotes: function() {
            this.$('span.like-count').text(this.model.voteCount);
        },
        
        comment: function(e) {
            e.stopPropagation();
            this.$('.sticker-action').editable('show');
        }
    });
}());