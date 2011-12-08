require 'rubygems'
require 'eventmachine'
require File.expand_path('../boot', __FILE__)

require 'controllers/websocket_controller'
require 'controllers/static_controller'

EventMachine.run {
  Cramp::Websocket.backend = :thin
  Rack::Handler::Thin.run WebsocketController, :Port => 4000
  Rack::Handler::Thin.run StaticController, :Port => 4567
}
