$:.unshift File.dirname(__FILE__)
$:.unshift File.expand_path('models', File.dirname(__FILE__))
$:.unshift File.expand_path('lib', File.dirname(__FILE__))
$:.unshift File.expand_path('helpers', File.dirname(__FILE__))

require './app2'

base = File.dirname(__FILE__)
Dir.glob(base + '/lib/*.rb'       ).each { |f| require f }
Dir.glob(base + '/helpers/*.rb'   ).each { |f| require f }
Dir.glob(base + '/models/*.rb'    ).each { |f| require f }
Dir.glob(base + '/resources/*.rb' ).each { |f| require f }