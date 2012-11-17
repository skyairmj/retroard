(function(){
    Board = Backbone.View.extend({
        el: 'article#sections',
        
        initialize: function() {
            this.sections = {}
        },
        
        add: function(title, section) {
            this.sections[title] = section;
            this.$el.append(section.$el)
        },

        getSection: function(title) {
            return this.sections[title];
        },
        
        synchronize: function(baseStickyUUID, sticky) {
            if (!!sticky.newSubordinate) {
                var dropped = this.$('div[data-uuid="'+baseStickyUUID+'"]').data('view');
                var droppee = this.$('div[data-uuid="'+sticky.newSubordinate.uuid+'"]').data('view')
                dropped.accept(droppee);
            }
            if (!!sticky.vote) {
                this.$('div[data-uuid="'+baseStickyUUID+'"]').data('view').model.vote()
            }
        }
    });
    
    Retrospective = Backbone.Model.extend({
        
    });
}());