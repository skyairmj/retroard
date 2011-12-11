require "rubygems"
require "cramp"
require "http_router"
require "rspec/cramp"
require 'ruby/spec_helper'

describe WebsocketController, :cramp => true do
  def app
    WebsocketController
  end

  it "should work without a matcher" do
    get "/"
    post "/"
    put "/"
    delete "/"
  end

  it "should respond to websocket requrest" do
    get('/').should respond_with :status => :ok  
  end
  
  it "should accept params" do
    post("/", :params => {:text => "whatever"}, :headers => {"Custom-Header" => "blah"})
  end
end
