require 'ruby/spec_helper'

describe DBOperator do
  include JSonHelper

  def set_db_base_line
    Sticky.delete_all
  end
  
  def empty_db
    DBClearer.clear_all
  end

  before(:each) do
    set_db_base_line
  end
  
  after(:each) do
    empty_db
  end
  
  it "should create or update the sticky" do
    uuid = '58-7-9-3-734'
    lastModified = 'some time'
    content = 'some content'
    request = <<-eos
      {
          "resource" : "sticky",
          "method" : "save",
          "data" : {
              "uuid" : "#{uuid}",
              "lastModified" : "#{lastModified}",
              "content" : "#{content}"
          }
      }
    eos
    
    DBOperator.new.handle parse_json(request)
    
    sticky = Sticky.find_by_uuid(uuid)
    sticky.should_not be_nil
    sticky.uuid.should == uuid
    sticky.lastModified.should == lastModified
    sticky.content.should == content
  end
end
