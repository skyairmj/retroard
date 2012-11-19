require 'sinatra'

class Assets < Sinatra::Base
  configure do
    set :assets, (Sprockets::Environment.new { |env|
      env.append_path(settings.public_folder + "/images")
      env.append_path(settings.public_folder + "/javascripts")
      env.append_path(settings.public_folder + "/stylesheets")

      # compress everything in production
      if ENV["RACK_ENV"] == "production"
        env.js_compressor  = YUI::JavaScriptCompressor.new
        env.css_compressor = YUI::CssCompressor.new
      end
    })
  end

  get "/assets/app.js" do
    content_type("application/javascript")
    settings.assets["app.js"]
  end

  get "/assets/app.css" do
    content_type("text/css")
    settings.assets["app.css"]
  end

  %w{jpg png}.each do |format|
    get "/assets/:image.#{format}" do |image|
      content_type("image/#{format}")
      settings.assets["#{image}.#{format}"]
    end
  end
end