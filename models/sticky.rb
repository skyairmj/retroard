require 'models/base_model'

class Sticky < BaseModel
  property :uuid, String
  index :uuid
  property :lastModified, String
  property :content, String
  
  
  def self.save data
    existing_sticky = find_by_uuid(data[:uuid])
    existing_sticky.nil? ? create(data) : existing_sticky.update_attributes(data)
  end
end
