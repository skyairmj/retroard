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
           var dropped = this.$('div[data-uuid="'+baseStickyUUID+'"]').data('view');
           var droppee = this.$('div[data-uuid="'+data.newSubordinate.uuid+'"]').data('view')
           dropped.accept(droppee);
        }
    });
    
    Retrospective = Backbone.Model.extend({
        
    });
}());