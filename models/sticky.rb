require 'models/base_model'
require 'models/section'
require 'models/team'

class Sticky < BaseModel
  property :uuid, String
  index :uuid
  property :lastModified, String
  property :content, String
  belongs_to :section
  
  
  def self.save data
    data_without_extra_info = data.clone
    data_without_extra_info.delete(:teamName)
    data_without_extra_info.delete(:section)

    existing_sticky = find_by_uuid(data[:uuid])
    if(existing_sticky.nil?)
      Team.find_by_name(data[:teamName]).section(data[:section]).stickies << create(data_without_extra_info)
    elsif
      existing_sticky.update_attributes(data_without_extra_info)
    end
  end
end
