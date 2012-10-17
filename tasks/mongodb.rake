require File.dirname(__FILE__) + '/../app'

namespace :db do
  desc 'drop all database'
  task :drop do
    MongoMapper.database.collections.select {|c| c.name !~ /system/ }.each(&:drop)
  end
  
  desc 'Load the seed data from db/seeds.rb'
  task :seed do
    seed_file = File.join('db', 'seeds.rb')
    load(seed_file) if File.exist?(seed_file)
  end
end
