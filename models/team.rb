require File.expand_path('base_model', File.dirname(__FILE__))
require File.expand_path('section', File.dirname(__FILE__))

class Team < BaseModel
  property :name, String
  index :name
  has_many :sections

  def section section_name
    self.sections.select{|section| section.name == section_name}.first
  end
end
