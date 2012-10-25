module Retroard
  class Retrospective
    include MongoMapper::Document
    
    # == Attributes
    key :title
    key :serial_no, Integer
    key :short_id
    timestamps!
    
    # == Indices
    
    # == Associations
    many :categories, :class_name => 'Retroard::Category'
    
    # == Validations
    validates_length_of :short_id, :is => 6
    
  end
end