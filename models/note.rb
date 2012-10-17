module Retroard
  class Note
    include MongoMapper::EmbeddedDocument
    key :content, :required => true
    key :vote, Integer
    
    timestamps!
    
  end
end