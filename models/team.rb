require 'base_model'
require 'section'

class Team < BaseModel
  property :name, String
  index :name
  has_many :sections

  def section section_name
    self.sections.select{|section| section.name == section_name}.first
  end
end
