require 'stringio'
require 'cramp'
require 'yajl'
require 'redis_connection'
require 'helpers/json_helper'
require 'lib/db_operator'
require 'models/sticky'

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
    @dbOperator.handle(msg)
    publish(data)
  end

  private

  def publish message
    @@connections.each do |connection|
      connection.render(message) if connection != self
    end
  end

end
