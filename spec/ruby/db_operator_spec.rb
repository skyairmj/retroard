require 'ruby/spec_helper'

describe DBOperator do
  include JSonHelper

  it "should persistence the sticky for create sticky request" do
    uuid = '58-7-9-3-234'
    lastModified = 'some time'
    content = 'some content'
    request = <<-eos
      {
          "resource" : "sticky",
          "method" : "create",
          "data" : {
              "uuid" : "#{uuid}",
              "lastModified" : "#{lastModified}",
              "content" : "#{content}"
          }
      }
    eos
    
    DBOperator.new.handle parse_json(request)
    Sticky.all[-1].uuid.should == uuid
    Sticky.all[-1].lastModified.should == lastModified
    Sticky.all[-1].content.should == content
  end
end
