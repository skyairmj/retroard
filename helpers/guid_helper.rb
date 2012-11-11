require 'uuid'

module Retroard
  module GUID
    CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    
    def short
      hex = Digest::MD5.hexdigest("retroard_#{UUID.new}")
      shortStr = []
      (0...hex.length/8).each do |i|
        outChars = ""
        j = i+1
        subHex = hex.slice(i*8, j*8)
        idx = "3FFFFFFFF".to_i(16) & subHex.to_i(16)
        (0...6).each do |k|
          index = ("0000003D".to_i(16) & idx).to_i
          outChars += CHARS[index]
          idx = idx >> 5
        end
        shortStr << outChars
      end
      shortStr[Random.rand(4)]
    end
  end
end
    