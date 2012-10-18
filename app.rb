require 'active_support/core_ext/string'

require 'config/config'

Sinatra::Base.set(:config, Config.environment_config)
Config.setup

Dir.glob('lib/*.rb'       ).each { |f| require f }
Dir.glob('helpers/*.rb'   ).each { |f| require f }
Dir.glob('models/*.rb'    ).each { |f| require f }
Dir.glob('resources/*.rb' ).each { |f| require f }