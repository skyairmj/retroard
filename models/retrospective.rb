module Retroard
  class Retrospective
    include MongoMapper::Document
    
    # == Attributes
    key :title
    key :serial_no, String, :required
    timestamps!
    
    # == Indices
    
    # == Associations
    many :categories, :class_name => 'Retroard::Category'
    
    # == Validations
  end
end