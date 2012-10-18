module Retroard
  class Note
    include MongoMapper::EmbeddedDocument
    key :content, :required => true
    key :vote, Integer
    key :uuid, :rquired=>true
    
    timestamps!
    
  end
end