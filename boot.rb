require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'sinatra-websocket'
require 'sinatra/base'
require 'digest'
require 'active_support/core_ext/string'

base = File.dirname(__FILE__)

$:.unshift base

require 'config/config'
Sinatra::Base.set(:config, Config.environment_config)

require 'app'