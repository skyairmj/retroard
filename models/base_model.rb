require 'redis_orm'

class BaseModel < RedisOrm::Base
  require 'redis'
  $redis = Redis.new if $redis.nil?
  
  def self.delete_all
    self.all.each{|s| s.destroy}
  end
end