require "rubygems"
require "cramp"
require "rspec"
require "http_router"
require "rspec/cramp"

require File.join(File.dirname(__FILE__), "../../../controllers", "retro_controller")

describe RetroController, :cramp => true do
  def app
    RetroController
  end

  it "should respond to websocket requrest" do
    get('/').should respond_with :status => :ok  
    #get('/').should respond_with :body => /^Welcome.*/
  end
end
