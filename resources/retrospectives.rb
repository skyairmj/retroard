module Retroard
  class Retrospectives < Sinatra::Base
    enable :inline_templates, :method_override, :sessions, :logging
    disable :run
    
    set :root, File.expand_path('..', File.dirname(__FILE__))

    get '/' do
        erb :index2
    end
=begin
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
=end
    post '/join' do
      redirect "/retrospective/#{params[:retrospectiveId]}", 303 unless params[:retrospectiveId].nil?
    end
    
    get '/retrospective/:retrospectiveId' do
      if request.xhr?
        content_type :json
        Retrospective.find_by_serial_no(params[:retrospectiveId].to_i).to_json
      else
        erb :board
      end
    end

    get '/:team/profile' do
      "hello! #{params[:team]}"
    end
    
  end
end