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
                dropped.accept(droppee);
            }
            if (!!sticker.vote) {
                this.$('div[data-uuid="'+baseStickerUUID+'"]').data('view').model.vote()
            }
        }
    });
    
    Retrospective = Backbone.Model.extend({
        
    });
}());