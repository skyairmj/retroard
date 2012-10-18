require 'rubygems'
require 'thin'
require 'rack'
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
      connection.send_data(message)
    end
  end
end

module Retroard
  class ResourceDispatcher
    def self.dispatch resource_uri, method, request_data
      case resource_uri
      when /notes$/
        case method
        when 'post'
          named_regex = /^\/retrospective\/(?<retroId>\d+)\/(?<category>\w+)\/notes$/
          result = named_regex.match(resource_uri)
          retroId = result[:retroId].to_i
          category_title = result[:category]
          retrospective = Retrospective.find_by_serial_no retroId
          category = retrospective.categories.select{|c|c.title==category_title}.first
          category.notes << Note.new({:uuid=>request_data[:uuid], :content=>request_data[:content]})
          retrospective.save
        end
      end
    end
  end
end

# Set service point for the websockets. This way we can run both web sockets and sinatra on the same server and port number.
map ('/ws') {run WebSocketApp.new}

# This delegates everything other route not defined above to the Sinatra app.
map ('/') {run Retroard::Retrospectives}