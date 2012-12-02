require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'sinatra-websocket'
require 'digest'

base = File.dirname(__FILE__)

$:.unshift base

require 'app'