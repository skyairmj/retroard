require 'redis'
require 'json'

class CreateStickyHandler
  def handle data
    sticky = JSON.parse data
    Sticky.create :content => sticky["content"]
  end
end