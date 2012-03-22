require 'cramp'
require 'helpers/json_helper'
require 'lib/db_operator'

class WebsocketController < Cramp::Websocket
  include JSonHelper
  @@connections = Array.new

  on_start :handle_join
  on_data :handle_data

  def handle_join
    @@connections << self
  end

  def initialize opt
    super opt
    @dbOperator = DBOperator.new
  end

  def handle_data(data)
    msg = parse_json(data)
    sticky = @dbOperator.handle(msg)
    msg[:data][:lastModified] = sticky.modified_at.to_s
    publish(encode_json(msg))
  end

  private

  def publish message
    @@connections.each do |connection|
      connection.render(message)
    end
  end

end
