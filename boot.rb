require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'sinatra/base'
require 'uuid'
require 'digest'

base = File.dirname(__FILE__)

$:.unshift base

require 'app'