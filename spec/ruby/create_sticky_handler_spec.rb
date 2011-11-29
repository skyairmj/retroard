Dir[File.dirname(__FILE__) + '/../../action_handlers/*.rb'].each {|file| require file }
Dir[File.dirname(__FILE__) + '/../../models/*.rb'].each {|file| require file }

describe CreateStickyHandler do
  it "should store the sticky" do
    CreateStickyHandler.new.handle "
      {
        \"content\" : \"this is the first sticky\"
      }
    "
    Sticky.all[-1].content.should == 'this is the first sticky'
  end
end