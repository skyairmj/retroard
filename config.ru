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
      when /^\/retrospective\/\d+\/\w+\/notes\/[\w|-]+$/
        named_regex = /^\/retrospective\/(?<retro_serial_no>\d+)\/(?<category_title>\w+)\/notes\/(?<note_uuid>[\w|-]+)$/
        result = named_regex.match(resource_uri)
        retro_serial_no = result[:retro_serial_no].to_i
        category_title = result[:category_title]
        note_uuid = result[:note_uuid]
        retrospective = Retrospective.find_by_serial_no retro_serial_no
        category = retrospective.categories.select{|c|c.title == category_title}.first
        case method
        when 'put'
          category.notes << Note.new({:uuid=>note_uuid, :content=>request_data[:content]})
        when 'post'
          base_note = category.notes.select{|n|n.uuid==note_uuid}.first
          new_subordinate = request_data[:newSubordinate]
          source_category = retrospective.categories.select{|c|c.title == new_subordinate[:category]}.first
          new_subordinate_note = source_category.notes.select{|n|n.uuid == new_subordinate[:uuid]}.first
          source_category.notes.delete new_subordinate_note
          base_note.subordinates << new_subordinate_note 
          unless new_subordinate_note.subordinates.empty?
            base_note.subordinates += new_subordinate_note.subordinates
            new_subordinate_note.subordinates.clear
          end
        end
        retrospective.save
      end
    end
  end
end

# Set service point for the websockets. This way we can run both web sockets and sinatra on the same server and port number.
map ('/ws') {run WebSocketApp.new}

# This delegates everything other route not defined above to the Sinatra app.
map ('/') {run Retroard::Retrospectives}