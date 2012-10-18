(function(){
    Board = Backbone.View.extend({
        initialize: function(option) {
            this.sections = {}
            this.sections['Well'] = new WellSection();
            this.sections['Less Well'] = new LessWellSection();
            this.sections['Puzzle'] = new PuzzleSection();
            this.sections['Idea'] = new IdeaSection();
            
            this.history = new History();
            this.history.initialize2();
        },

        getSection: function(title) {
            return this.sections[title];
        }
    });
    
    Retrospective = Backbone.Model.extend({
        
    });
}());