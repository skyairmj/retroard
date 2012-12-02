Dir.glob('lib/*.rb'       ).each { |f| require f }
Dir.glob('helpers/*.rb'   ).each { |f| require f }
Dir.glob('models/*.rb'    ).each { |f| require f }
Dir.glob('resources/*.rb' ).each { |f| require f }

module Retroard
  class Application < Sinatra::Base
    use WebSocket
    use Retrospectives
  end
end