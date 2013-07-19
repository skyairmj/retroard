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
        
        synchronize: function(baseStickerUUID, sticker) {
            if (!!sticker.newSubordinate) {
                var dropped = this.$('div[data-uuid="'+baseStickerUUID+'"]').data('view');
                var droppee = this.$('div[data-uuid="'+sticker.newSubordinate.uuid+'"]').data('view')
                dropped.accept(droppee).highlight();
            }
            if (!!sticker.vote) {
                var voted = this.$('div[data-uuid="'+baseStickerUUID+'"]').data('view');
                voted.model.vote();
                voted.highlight();
            }
        }
    });
    
    Retrospective = Backbone.Model.extend({
        
    });
}());