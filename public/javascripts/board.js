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
        }
    });
    
    Retrospective = Backbone.Model.extend({
        
    });
}());