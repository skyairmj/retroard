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
        redirect "/#{params[:team]}", 303
      end
    end

    post '/signup' do
      unless params[:team].nil?
        redirect "/#{params[:team]}", 303
      end
    end
    
    get '/:team' do
      @retrospective = Retrospective.last
      erb :board
    end

    get '/:team/retro/:retroId' do
      content_type :json
      json = Retrospective.find_by_serial_no(params[:retroId].to_i).to_json
      # Retrospective.find_by_serial_no(params[:retroId].to_i).to_json
      puts json
      return json
    end

    get '/:team/profile' do
      "hello! #{params[:team]}"
    end
    
  end
end