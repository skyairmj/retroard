require File.dirname(__FILE__) + '/base_model'

class Sticky < BaseModel
  property :content, String
  
  belongs_to :section
  belongs_to :group
end