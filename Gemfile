source :rubygems

gem 'rake'
gem 'rack'
gem 'rack-contrib'
gem 'thin'
gem 'sinatra'
gem 'websocket-rack'
gem 'sinatra-websocket'
gem 'uuid'
gem 'i18n'

gem 'activesupport'
gem 'json'
gem 'yajl-ruby'

gem 'bson_ext'
gem 'mongo_mapper'

gem "hiredis", "~> 0.4.4"
gem "redis", "~> 2.2.0", :require => ["redis/connection/hiredis", "redis"]

group :development do
  gem "sprockets"
  gem "yui-compressor"
  gem "coffee-script"
  gem "sass"
end

group :test do
  gem 'rspec'
  gem 'jasmine'
  gem 'rcov', '0.9.10'
end

group :deploy do
  gem 'capistrano'
  gem 'capify-ec2'
  gem 'rvm-capistrano'
end

group :ops do
  gem 'chef'
end