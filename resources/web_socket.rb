module Retroard
  class WebSocket < Sinatra::Base
    include JSON

    set :server, 'thin'
    set :sockets, []
    
    get '/ws' do
      raise Sinatra::NotFound if !request.websocket?

      request.websocket do |ws|
        ws.onopen do
          settings.sockets << ws
          logger.info "wetbsocket #{ws} connected"
        end
        ws.onmessage do |message|
          msg = parse(message)
          resource_uri = msg[:resourceUri]
          method = msg[:method]
          status, headers, body = call! env.merge("PATH_INFO" => resource_uri, "REQUEST_METHOD" => method.upcase, "rack.input"=>StringIO.new(msg[:data]), "CONTENT_TYPE" =>'application/x-www-form-urlencoded')
          [status, headers, body.map(&:upcase)]
          EM.next_tick { settings.sockets.each{|socket| socket.send(message) unless socket == ws} }
        end
        ws.onclose do
          logger.info "wetbsocket #{ws} disconnected"
          settings.sockets.delete(ws)
        end
      end
    end
  end
end