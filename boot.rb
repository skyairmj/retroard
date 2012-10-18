require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'sinatra/base'

base = File.dirname(__FILE__)

$:.unshift base

require 'app'