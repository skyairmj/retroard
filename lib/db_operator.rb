class DBOperator
  
  def handle command
    model = command[:class]
    action = command[:method]
    eval "#{model.capitalize}.#{action} (#{command[:data]})"
  end
  
end