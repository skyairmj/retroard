include Rake::DSL
require 'rake'

# Everything else
Dir.glob('lib/tasks/*.rake').each { |r| import r }

task :server do
  sh "ruby -rubygems app.rb"
end

task :default => :server
