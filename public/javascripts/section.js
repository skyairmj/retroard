(function(){
    Section = Backbone.View.extend({
        events: {
            'click .addStickyButton': 'setStickyTarget'
        },
        
        initialize: function() {
            this.title = this.$el.attr('data-title')
        },
    
        setStickyTarget: function() {
            StickyDialog.target(this);
        },
        
        synchronizeSticky: function(data) {
            if (this.$(data.uuid).length == 0) {
                newSticky = new Sticky(this.title, data.content, data.uuid);
                new StickyView({model: newSticky}).render();
            } else {
                //update the existing sticky
            }
            
        }
    });
    
    WellSection = Section.extend({el: 'section[data-title="Well"]'});
    LessWellSection = Section.extend({el: 'section[data-title="Less Well"]'});
    PuzzleSection = Section.extend({el: 'section[data-title="Puzzle"]'});
    IdeaSection = Section.extend({el: 'section[data-title="Idea"]'}); 
}());