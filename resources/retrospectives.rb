module Retroard
  class Retrospectives < Sinatra::Base
    enable :inline_templates, :method_override, :sessions, :logging
    disable :run
    
    set :root, File.expand_path('..', File.dirname(__FILE__))

    get '/' do
        erb :index
    end

    post '/signin' do
      unless params[:team].nil?
        redirect "/#{params[:team]}/retro/1", 303
      end
    end

    post '/signup' do
      unless params[:team].nil?
        redirect "/#{params[:team]}/retro/1", 303
      end
    end

    get '/:team/retro/:retroId' do
      @retrospective = Retrospective.find_by_serial_no params[:retroId].to_i
      erb :board
    end

    get '/:team' do
      "hello! #{params[:team]}"
    end
    
  end
end