(function(){
    MessageBox = new (Backbone.View.extend({
        el: 'div#messageContainer',
        
        append: function(message) {
            this.$el.append(message.$el);
        }
    }))();
    
    Message = Backbone.View.extend({
        className: 'message alert',
        
        initialize: function(options) {
            this.message = options.message;
            this.fadeOut = options.hasOwnProperty('fadeOut') ? options.fadeOut : true;
        },
        
        render: function() {
            this.$el.html(this.message);
            message = this.$el.slideUp(800).delay(3000);
            if(this.fadeOut)message.fadeOut(600);
            return this;
        }
    });
    
    SuccessMessage = Message.extend({
        className: 'alert alert-success message'
    });
    
    InformationMessage = Message.extend({
        className: 'alert alert-inf message'
    });
    
    ErrorMessage = Message.extend({
        className: 'message alert alert-error'
    });
}());