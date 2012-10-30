(function(){
    Section = Backbone.View.extend({
        tagName: 'section',
        className: 'section span3',
        template: _.template('<div class="section-header">'+
						'<h3><%=title%></h3>'+
						'<a href="#modal" data-toggle="modal" role="button" class="add-sticky"></a>'+
					'</div>'+
					'<div class="section-body">'+
                    '</div>'),
                
        events: {
            'click .add-sticky': 'setStickyTarget'
        },
        
        initialize: function(option) {
            this.title = option.title;
            this.$el.attr('data-title', this.title);
            this.$el.attr('id', this.title);
            this.$el.html(this.template({title: this.title}));
        },
    
        setStickyTarget: function() {
            StickyDialog.target(this);
        },
        
        add: function(stickyView){
            this.$('.section-body').append(stickyView.$el);
        },
        
        synchronize: function(uuid, data) {
//            if (this.$(uuid).length == 0) {
                newSticky = new Sticky(this.title, data.content, uuid);
                this.add(new StickyView({model: newSticky}).render());
  //          } else {
                //update the existing sticky
    //        }
            
        }
    });
}());