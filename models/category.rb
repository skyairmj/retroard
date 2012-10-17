module Retroard
  class Category
    include MongoMapper::EmbeddedDocument
    # == Attributes
    key :title, :required => true
    key :description, String
    
    # == Indices
    
    # == Associations
    many :notes, :class_name => 'Retroard::Note'
    
    # == Validations
  end
end