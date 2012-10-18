require 'rake'
require './boot'

namespace :server do
  desc 'start web server'
  task :start do
    system 'thin', 'start'
  end
end

task :environment do
  Config.setup
end

require 'rspec/core/rake_task'

RSpec::Core::RakeTask.new(:spec) do |t|
  t.pattern = "spec/ruby/**/*_spec.rb" # don't need this, it's default.
end

RSpec::Core::RakeTask.new(:rcov) do |t|
  t.pattern = "spec/ruby/**/*_spec.rb" # don't need this, it's default.
  t.rcov = true
  t.rcov_opts = ['--exclude', 'spec']
end

#task :default => :spec

begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end

Dir['tasks/mongodb.rake'].each { |file| import file }