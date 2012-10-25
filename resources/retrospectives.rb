module Retroard
  class Retrospectives < Sinatra::Base
    enable :inline_templates, :method_override, :sessions, :logging
    disable :run
    
    set :root, File.expand_path('..', File.dirname(__FILE__))

    get '/' do
        erb :index2
    end
    
    post '/join' do
      redirect "/retrospectives/#{params[:retrospectiveId]}", 303 unless params[:retrospectiveId].nil?
    end
    
    get '/retrospectives/:retrospectiveId' do
      if request.xhr?
        content_type :json
        Retrospective.find_by_serial_no(params[:retrospectiveId]).to_json
      else
        erb :board
      end
    end
    
    put '/retrospectives' do
      retro = Retrospective.new({:serial_no => serial_no()})
      well = Category.new({:title => 'Well'})
      less_well = Category.new({:title => 'LessWell'})
      idea = Category.new({:title => 'Idea'})
      puzzle = Category.new({:title => 'Puzzle'})
      retro.categories += [well, less_well, idea, puzzle]
      retro.save
      session[:retrospectiveId] = retro.serial_no
      redirect "/retrospectives", 303
    end
    
    get '/retrospectives' do
      @retrospectiveId = session[:retrospectiveId]
      session[:retrospectiveId] = nil
      erb :result
    end

    get '/:team/profile' do
      "hello! #{params[:team]}"
    end
    
    def serial_no
      chars = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      hex = Digest::MD5.hexdigest("retroard_#{UUID.new}")
      hexLen = hex.length
      subHexLen = hexLen/8
      shortStr = []
      (0...subHexLen).each do |i|
        outChars = ""
        j = i+1
        subHex = hex.slice(i*8, j*8)
        idx = "3FFFFFFFF".to_i(16) & subHex.to_i(16)
        (0...6).each do |k|
          index = ("0000003D".to_i(16) & idx).to_i
          outChars += chars[index]
          idx = idx >> 5
        end
        shortStr << outChars
      end
      shortStr[Random.rand(4)]
    end
    
  end
end