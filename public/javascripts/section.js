(function(){
    Section = Backbone.View.extend({
        tagName: 'section',
        className: 'section span3',
        template: _.template('<div class="section-header">'+
						'<h3><%=title%></h3>'+
						'<a href="#modal" data-toggle="modal" role="button" class="add-sticker"></a>'+
					'</div>'+
					'<div class="section-body gridster"><ul></ul>'+
                    '</div>'),
                
        events: {
            'click .add-sticker': 'setStickerTarget'
        },
        
        initialize: function(option) {
            this.title = option.title;
            this.$el.attr('data-title', this.title);
            this.$el.attr('id', this.title);
            this.$el.html(this.template({title: this.title}));
        },
    
        setStickerTarget: function() {
            StickerDialog.target(this);
        },
        
        add: function(stickerView){
            this.$('.section-body').append(stickerView.$el);
        },
        
        synchronize: function(uuid, data) {
//            if (this.$(uuid).length == 0) {
                newSticker = new Sticker(this.title, data.content, uuid);
                stickerView = new StickerView({model: newSticker, isSynchronized: true});
                stickerView.highlight();
                this.add(stickerView.render());
  //          } else {
                //update the existing sticker
    //        }
            
        }
    });
}());