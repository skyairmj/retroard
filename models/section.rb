require File.expand_path('base_model', File.dirname(__FILE__))
require File.expand_path('team', File.dirname(__FILE__))
require File.expand_path('sticky', File.dirname(__FILE__))

class Section < BaseModel
  property :name, String
  belongs_to :team
  has_many :stickies
end
