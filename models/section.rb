require 'models/base_model'
require 'models/team'
require 'models/sticky'

class Section < BaseModel
  property :name, String
  belongs_to :team
  has_many :stickies
end
