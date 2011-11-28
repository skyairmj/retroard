require 'stringio'
require 'cramp'
require 'yajl'  

class WebsocketController < Cramp::Websocket
  on_start :create_redis
  on_finish :handle_leave, :destroy_redis
  on_data :handle_data

  def create_redis
    render ({:content => "Welcome to Team Retro, improve all the time", :user => "haha"}).to_json
  end

  def handle_leave
  end

  def destroy_redis
  end

  def handle_data
  end
end
