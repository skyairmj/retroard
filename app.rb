%w(lib helpers models resources).each{|dir| Dir.glob(dir+'/*.rb').each {|file| require file}}

module Retroard
  class Application < Sinatra::Base
    use WebSocket
    use Retrospectives
    
    enable :inline_templates, :method_override, :sessions, :logging
    disable :run
    set :protection, except: :session_hijacking
    
    configure :production, :development do
      enable :dump_errors, :raise_errors
    end
    
    before do
      expires 500, :public, :must_revalidate
    end
    
    get '/' do
      redirect '/index.html', 302
    end
  end
end