require 'redis'

class RedisConnection

  def initialize host=nil, port=nil
    host = (host || ENV['REDIS_HOST'] || 'localhost')
    port = (port || ENV['REDIS_PORT'] || 6379).to_i
    @redis = Redis.new(:host => host, :port => port)
  end

  def method_missing(method, *args, &block)
    @redis.send method, *args, &block
  end
end
