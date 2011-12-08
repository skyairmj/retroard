require 'ruby/spec_helper'

describe ActionDispatcher do
  it "should return the right handler" do
    ActionDispatcher.handler("CREATE_STICKY").class.should == CreateStickyHandler
  end
end