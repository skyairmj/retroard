require 'models/base_model'

class Sticky < BaseModel
  property :uuid, String
  property :lastModified, String
  property :content, String
  
  belongs_to :section
  belongs_to :group
end
