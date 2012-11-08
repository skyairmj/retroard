require 'rubygems'
require 'thin'
require 'rack'
require 'rack/contrib'
require 'rack/websocket'
require 'json'
require './boot'

Config.setup

class WebSocketApp < Rack::WebSocket::Application

  include JSonHelper
  @@connections = Array.new

	def on_open(env)
		puts "Client #{self} Connected"
    @@connections << self
	end

	def on_close(env)
	  @@connections.delete(self)
		puts "Client #{self} Disconnected"
	end

	def on_message(env, message)
		puts "Received message: #{message}"
		
		msg = parse_json(message)
		resource_uri = msg[:resourceUri]
    method = msg[:method]
    Retroard::ResourceDispatcher.dispatch resource_uri, method, msg[:data]
    publish(message)
	end

	def on_error(env, error)
		puts "Error occured: " + error.message
	end

  private

  def publish message
    @@connections.each do |connection|
      connection.send_data(message) unless connection == self
    end
  end
end

use Rack::StaticCache, :urls => ["/stylesheets", "/javascripts", "/fonts", "/images", "/*.html"], :root => Dir.pwd + '/public', :duration => 3600
use Rack::Deflater

# Set service point for the websockets. This way we can run both web sockets and sinatra on the same server and port number.
map ('/ws') {run WebSocketApp.new}

# This delegates everything other route not defined above to the Sinatra app.
map ('/') {run Retroard::Retrospectives}