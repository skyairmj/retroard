require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'sinatra/base'
require 'digest'

base = File.dirname(__FILE__)

$:.unshift base

require 'app'