set :application, "Retroad"
set :repository,  "git://github.com/mingjin/retroard.git"

set :scm, :git
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`
set :deploy_via, :remote_cache

set :location, 'ec2-54-243-231-97.compute-1.amazonaws.com'
role :web, location                          # Your HTTP server, Apache/etc
role :app, location                          # This may be the same as your `Web` server
role :db, location, :primary=>true
#role :db,  "your primary db-server here", :primary => true # This is where Rails migrations will run
#role :db,  "your slave db-server here"

set :user, "ubuntu"
ssh_options[:keys] = [File.join(ENV["HOME"], ".ssh", "id_rsa")] 

# Load RVM's capistrano plugin.    
require "rvm/capistrano"

set :rvm_path, '/usr/local/rvm/'
set :rvm_bin_path, '/usr/local/rvm/bin'
set :rvm_ruby_string, '1.9.2-p290@retroard'
$:.unshift(File.expand_path('./lib', ENV['rvm_path']))

# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

# If you are using Passenger mod_rails uncomment this:
namespace :deploy do
  task :start, :roles => :app do
    run "cd #{current_path} && bundle exec thin start -C config/environment.yml"    
  end
  
  task :stop, :roles => :app do 
    run "cd #{current_path} && bundle exec thin stop -C config/environment.yml"  
  end
  
  task :restart, :roles => :app  do
    stop
    start
  end
end
