require 'redis_orm'

class BaseModel < RedisOrm::Base
  require 'redis'
  $redis = Redis.new if $redis.nil?
end