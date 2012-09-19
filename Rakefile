require 'rake'
require 'rack'
require 'rspec/core/rake_task'
require 'systemu'

RSpec::Core::RakeTask.new(:spec) do |t|
  t.pattern = "spec/ruby/**/*_spec.rb" # don't need this, it's default.
end

RSpec::Core::RakeTask.new(:rcov) do |t|
  t.pattern = "spec/ruby/**/*_spec.rb" # don't need this, it's default.
  t.rcov = true
  t.rcov_opts = ['--exclude', 'spec']
end

# Everything else
Dir.glob('lib/tasks/*.rake').each { |r| import r }

namespace :server do
  task :start do
    system 'ruby', 'application.rb'
  end
end

namespace :redis do
  task :start do
    system 'redis-server'
  end
end

task :default => :spec

begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end
