module Retroard
  class Retrospectives < Sinatra::Base
    include GUID
    enable :inline_templates, :method_override, :sessions, :logging
    disable :run
    
    set :root, File.expand_path('..', File.dirname(__FILE__))
    
    before do
      expires 500, :public, :must_revalidate
    end
    
    get '/' do
      redirect '/index.html', 302
    end
    
    post '/join' do
      redirect "/board.html#!/#{params[:retrospectiveId]}", 303 unless params[:retrospectiveId].nil?
    end
    
    get %r{^/([\w]+)$} do |retrospective_id|
      if request.xhr?
        content_type :json
        retro = Retrospective.find_by_serial_no(retrospective_id)
        if retro.nil? 
          raise Sinatra::NotFound
        else
          retro.to_json
        end
      end
    end
    
    put '/' do
      retro = Retrospective.new({:serial_no => short})
      well = Category.new({:title => 'Well'})
      less_well = Category.new({:title => 'LessWell'})
      idea = Category.new({:title => 'Idea'})
      puzzle = Category.new({:title => 'Puzzle'})
      retro.categories += [well, less_well, idea, puzzle]
      retro.save
      redirect "/result.html#!/#{retro.serial_no}", 303
    end    
  end
end