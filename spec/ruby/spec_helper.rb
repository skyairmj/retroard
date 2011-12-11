require 'rspec'
require File.expand_path('../../../boot', __FILE__)

folders_to_test = ['action_handlers', 'controllers', 'models']

folders_to_test.each do |folder|
  Dir[File.dirname(__FILE__) + "/../../#{folder}/**/*.rb"].each {|file| require file }
end
