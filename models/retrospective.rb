module Retroard
  class Retrospective
    include MongoMapper::Document
    
    # == Attributes
    key :uuid, :rquired=>true
    timestamps!
    
    # == Indices
    
    # == Associations
    many :categories, :class_name => 'Retroard::Category'
    
    # == Validations
    
  end
end