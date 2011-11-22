require 'rake'
require 'rack'
require './backend'

# Everything else
Dir.glob('lib/tasks/*.rake').each { |r| import r }

task :server do
  sh "ruby -rubygems app.rb"
end

task :ws do
  Rack::Handler::Thin.run Websocket, :Port => 4000
end

task :default => :server

begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end
