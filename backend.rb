require 'cramp'
require 'yajl/json_gem'

Cramp::Websocket.backend = :thin

class Websocket < Cramp::Websocket
  on_start :user_connected

    def user_connected
      render ({:content => "Welcome to yact, chat away",
                    :user => "yact"}).to_json
    end
end
