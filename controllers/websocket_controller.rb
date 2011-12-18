require 'stringio'
require 'cramp'
require 'yajl'  
require 'redis_connection'
require 'helpers/json_helper'
require 'lib/db_operator'

class WebsocketController < Cramp::Websocket
  include JSonHelper

  on_start :handle_join, :create_redis
  on_finish :destroy_redis, :handle_leave
  on_data :handle_data
  
  def handle_join
    render "{'haha':'hehe'}"
  end

  def initialize opt
    super opt
    @dbOperator = DBOperator.new
  end
  def create_redis
    @pub = RedisConnection.new
    @sub = RedisConnection.new
    #subscribe
  end

  def handle_leave
    #unsubscribe
  end

  def destroy_redis
    @pub.quit
    @sub.quit
  end

  def handle_data(data)
    msg = parse_json(data)
    sticky = msg[:data]
    sticky[:lastModified] = Time.new.to_s
    puts "------#{sticky}"
    @dbOperator.handle(msg)
    #publish msg
    publish(msg)
  end

  private

  def subscribe
    @sub.psubscribe('team.retro.*') do |sub|
      sub.psubscribe do |event, total|
        puts "Subscribed to ##{event} (#{total} subscriptions)"
      end

      sub.pmessage do |pattern, event, message|
        render(message)
      end

      sub.punsubscribe do |event, total|
        puts "Unsubscribed for ##{event} (#{total} subscriptions)"
      end
    end
  end

  def publish message
    @pub.publish('team.retro.sticky', encode_json(message))
  end

  def unsubscribe
    @sub.unsubscribe if @sub.subscribed?
  end

end
