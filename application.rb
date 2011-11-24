require 'rubygems'
require 'eventmachine'
require 'stringio'
require 'sinatra/base'
require 'cramp'
require 'yajl'

class RetroController < Cramp::Websocket
  on_start :create_redis
  on_finish :handle_leave, :destroy_redis
  on_data :received_data
end

class StaticController < Sinatra::Base
  enable :inline_templates
  get('/') { erb :main }
end

EventMachine.run {
  Cramp::Websocket.backend = :thin
  Rack::Handler::Thin.run RetroController, :Port => 8081
  Rack::Handler::Thin.run StaticController, :Port => 8082
}
