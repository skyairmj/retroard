require 'ruby/spec_helper'
require 'rack/test'

describe StaticController do
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  it "should will retrieve team when this team is first hit" do
    #TODO catnot hook to the controller...
    get '/'
  end
end