Dir[File.dirname(__FILE__) + '/../../action_handlers/*.rb'].each {|file| require file }

describe ActionDispatcher do
  it "should return the right handler" do
    ActionDispatcher.handler("CREATE_STICKY").class.should == CreateStickyHandler
  end
end