require 'rubygems'
require 'rack'
require 'rack/contrib'
require './boot'

use Rack::Deflater
use Rack::StaticCache, :urls => ["/stylesheets", "/javascripts", "/fonts", "/images", "/*.html"], :root => Dir.pwd + '/public', :duration => 3600
use Rack::ETag

# This delegates everything other route not defined above to the Sinatra app.
Config.setup
run Retroard::Application