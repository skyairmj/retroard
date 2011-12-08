require 'action_handlers/create_sticky_handler'

class ActionDispatcher
  @@op_code_mapping = {
    "CREATE_STICKY" => 'CreateStickyHandler'
  }
  
  def self.handler op_code
    eval "#{@@op_code_mapping['CREATE_STICKY']}.new"
  end
end