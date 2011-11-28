require 'sinatra/base' 

class StaticController < Sinatra::Base
  enable :inline_templates
  set :root, File.dirname(__FILE__)+ '/..'
  set :public_folder, Proc.new { File.join(root, "static") }
  set :views, Proc.new { File.join(root, "views") }

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
    erb :board                                                                                                                     end

  get '/:team/profile' do
    "hello! #{params[:team]}"
  end
end
