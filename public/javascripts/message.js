(function(){
    Message = Backbone.Model.extend({
        initialize: function(options) {
            this.message = options.message;
        }
    });
    
    MessageBox = new (Backbone.View.extend({
        el: '#messageContainer',
        
        append: function(message) {
            
        }
    }))();
        
    SuccessMessage = Message.extend({
        tagName: 'div',
        className: 'alert alert-success message',
        
        initialize: function() {
            this.$el.html(this.model.message);
        }
    });
    InformationMessage = Message.extend({});
}());