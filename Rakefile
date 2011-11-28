require 'rake'
require 'rack'

# Everything else
Dir.glob('lib/tasks/*.rake').each { |r| import r }

namespace :server do
  task :start do
    sh 'ruby -rubygems application.rb'
  end
end

namespace :redis do
  task :start do
    sh 'redis-server'
  end  
end

task :default => 'server:start'

begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end
