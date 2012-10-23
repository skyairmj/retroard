(function(){
    Board = Backbone.View.extend({
        el: 'article#sections',
        
        initialize: function() {
            this.sections = {}
            this.history = new History();
            this.history.initialize2();
        },
        
        add: function(title, section) {
            this.sections[title] = section;
            this.$el.append(section.$el)
        },

        getSection: function(title) {
            return this.sections[title];
        },
        
        synchronize: function(baseStickyUUID, data) {
            if (!!data.newSubordinate) {
                var dropped = this.$('div[data-uuid="'+baseStickyUUID+'"]').data('view');
                var droppee = this.$('div[data-uuid="'+data.newSubordinate.uuid+'"]').data('view')
                dropped.accept(droppee);
            }
            if (!!data.vote) {
                this.$('div[data-uuid="'+baseStickyUUID+'"]').data('view').model.vote()
            }
        }
    });
    
    Retrospective = Backbone.Model.extend({
        
    });
}());