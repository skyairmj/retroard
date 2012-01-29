require 'ruby/spec_helper'

describe DBOperator do
  include JSonHelper

  it "should create or update the sticky" do
    request = <<-eos
      {
          "resource" : "sticky",
          "method" : "save",
          "data" : {
              "uuid" : "#{'58-7-9-3-734'}",
              "lastModified" : "#{'some time'}",
              "content" : "#{'some content'}"
          }
      }
    eos

    Sticky.should_receive(:save).with({:uuid => '58-7-9-3-734',
                          :lastModified => 'some time',
                          :content => 'some content'}
                         )

    DBOperator.new.handle parse_json(request)
  end
end
