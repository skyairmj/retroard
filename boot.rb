$:.unshift File.dirname(__FILE__)
$:.unshift File.expand_path('models', File.dirname(__FILE__))
$:.unshift File.expand_path('lib', File.dirname(__FILE__))
$:.unshift File.expand_path('helpers', File.dirname(__FILE__))

require 'app'