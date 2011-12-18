require 'ruby/spec_helper'

describe DBOperator do
  include JSonHelper

  it "should persistence the sticky for create sticky request" do
    uuid = '58-7-9-3-234'
    lastModify = 'some time'
    content = 'some content'
    request = <<-eos
      {
          "class" : "sticky",
          "method" : "create",
          "data" : {
              "uuid" : "#{uuid}",
              "lastModify" : "#{lastModify}",
              "content" : "#{content}"
          }
      }
    eos
    
    DBOperator.new.handle parse_json(request)
    Sticky.all[-1].uuid.should == uuid
    Sticky.all[-1].lastModify.should == lastModify
    Sticky.all[-1].content.should == content
  end
end