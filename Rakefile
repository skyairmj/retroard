require 'rake'
require 'rack'

# Everything else
Dir.glob('lib/tasks/*.rake').each { |r| import r }

task :server do
  sh "ruby -rubygems application.rb"
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
