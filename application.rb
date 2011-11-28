require 'rubygems'
require 'eventmachine'

require File.join(File.dirname(__FILE__), 'controllers', 'websocket_controller')
require File.join(File.dirname(__FILE__), 'controllers', 'static_controller')

EventMachine.run {
  Cramp::Websocket.backend = :thin
  Rack::Handler::Thin.run WebsocketController, :Port => 4000
  Rack::Handler::Thin.run StaticController, :Port => 4567
}
