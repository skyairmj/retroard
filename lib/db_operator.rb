class DBOperator

  def handle command
    model = command[:resource]
    action = command[:method]
    eval "#{model.capitalize}.#{action} (#{command[:data]})"
  end

end
