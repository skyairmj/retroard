(function(){
    MessageBox = new (Backbone.View.extend({
        el: 'div#messageContainer',
        
        append: function(message) {
            this.$el.append(message.$el);
        }
    }))();
    
    Message = Backbone.View.extend({
        className: 'message',
        
        initialize: function(options) {
            this.message = options.message;
        },
        
        render: function() {
            this.$el.text(this.message);
            this.$el.slideUp(800).delay(5000).fadeOut(600);
            return this;
        }
    });
    
    SuccessMessage = Message.extend({
        tagName: 'div',
        className: 'alert alert-success message',
        
        initialize: function() {
            this.$el.html(this.model.message);
        }
    });
    InformationMessage = Message.extend({});
}());