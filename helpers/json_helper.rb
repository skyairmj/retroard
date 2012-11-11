require 'yajl'

module Retroard
  module JSON
    def encode(obj)
      Yajl::Encoder.encode(obj)
    end

    def parse(str)
      Yajl::Parser.parse(str, :symbolize_keys => true)
    end
  end
end