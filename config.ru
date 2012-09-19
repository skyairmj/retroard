require 'rubygems'
require 'thin'
require 'rack'
require 'rack/websocket'
require 'sinatra'
require File.expand_path('helpers/json_helper', File.dirname(__FILE__))
require File.expand_path('lib/db_operator', File.dirname(__FILE__))

class WebSocketApp < Rack::WebSocket::Application

  include JSonHelper
  @@connections = Array.new
  
	def initialize(options = {})
		super
		@socket_mount_point = options[:socket_mount_point]
		@dbOperator = DBOperator.new
	end

	def on_open(env)
		# Protect against connections to invalid mount points.
		if env['REQUEST_PATH'] != @socket_mount_point
			close_websocket
			puts "Closed attempted websocket connection because it's requested a mount point other than #{@socket_mount_point}"
		end

		puts "Client Connected"
    @@connections << self
	end

	def on_close(env)
		puts "Client Disconnected"
	end

	def on_message(env, message)
		puts "Received message: #{message}"
		
		msg = parse_json(message)
    sticky = @dbOperator.handle(msg)
    msg[:data][:lastModified] = sticky.modified_at.to_s
    publish(encode_json(msg))
	end

	def on_error(env, error)
		puts "Error occured: " + error.message
	end

  private

  def publish message
    @@connections.each do |connection|
      connection.send_data(message)
    end
  end
end

class SinatraApp < Sinatra::Application

	# load the Sinatra app.
	require './app.rb'
end

# Set service point for the websockets. This way we can run both web sockets and sinatra on the same server and port number.
map '/ws' do
	run WebSocketApp.new(:socket_mount_point => '/ws')
end

# This delegates everything other route not defined above to the Sinatra app.
map '/' do
	run SinatraApp
end