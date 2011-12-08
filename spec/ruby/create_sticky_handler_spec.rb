require 'ruby/spec_helper'

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