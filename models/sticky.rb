require File.expand_path('base_model', File.dirname(__FILE__))
require File.expand_path('section', File.dirname(__FILE__))
require File.expand_path('team', File.dirname(__FILE__))

class Sticky < BaseModel
  property :uuid, String
  index :uuid
  property :content, String
  property :created_at, Time
  property :modified_at, Time
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
    find_by_uuid(data[:uuid])
  end
end
