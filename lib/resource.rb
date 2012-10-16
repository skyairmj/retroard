require 'json'
require 'sinatra'

class Resource < Sinatra::Base
  def self.use_model(model)
    define_method(:model) do
      return model
    end
  end
  
  def self.any(path, opts = {}, &block)
    [:get, :put, :post, :delete].each do |method|
      send(method, path, opts, &block)
    end
  end
  
  helpers do
    def json_status(code, message)
      status(code)
      { :status => code, :message => message }.to_json
    end
    
    def parse_body
      request.body.rewind
      
      attrs = begin
        JSON.parse(request.body.read)
      rescue JSON::ParserError
        json_status(400, 'Malformed JSON')
      end
      
      fields = model.fields.keys - ['_id', '_type']
      accepted = fields.map { |field| [field, attrs[field]] if attrs[field] }
      Hash[accepted]
    end
    
    def find(id)
      begin
        yield(model.find(id))
      rescue Mongoid::Errors::DocumentNotFound
        json_status(404, "Invalid #{model.name.downcase} ID")
      end
    end
  end
  
  before do
    content_type(:json)
  end
  
  get '/?' do
    model.all.to_json
  end
  
  post '/?' do
    status(201)
    model.create!(parse_body).to_json
  end
  
  get '/:id/?' do |id|
    find(id) do |doc|
      doc.to_json
    end
  end
  
  put '/:id/?' do |id|
    find(id) do |doc|
      doc.update_attributes!(parse_body)
      doc.to_json
    end
  end
  
  delete '/:id/?' do |id|
    find(id) do |doc|
      status 204
      doc.destroy
    end
  end
  
  any '*' do
    json_status(405, 'Method not allowed')
  end
  
  error do
    json_status(500, env['sinatra.error'].message)
  end
end