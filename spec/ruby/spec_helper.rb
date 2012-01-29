require 'rspec'
require File.expand_path('../../../boot', __FILE__)

folders_to_test = ['controllers', 'models', 'lib', 'helpers']

folders_to_test.each do |folder|
  Dir[File.dirname(__FILE__) + "/../../#{folder}/**/*.rb"].each {|file| require file }
end

RSpec.configure do |config|
  config.color_enabled = true
end

class DBClearer
  @@models = [Sticky, Team, Section]
  
  def self.clear_all
    @@models.each do |model|
      model.delete_all
    end
  end
end