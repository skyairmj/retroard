name "retroard_server"
description "Set up a retroard server"
run_list "recipe[haproxy]", "recipe[redisio]", "recipe[nginx]", "recipe[rvm]", "recipe[mongodb]"
default_attributes "node" => { "attribute" => [ "value", "value", "etc." ] }
override_attributes :rvm => { :ruby => { :implementation => "ruby", :version => "1.9.2", :patch_level => "290" } }