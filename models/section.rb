require 'base_model'
require 'team'
require 'sticky'

class Section < BaseModel
  property :name, String
  belongs_to :team
  has_many :stickies
end
