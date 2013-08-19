#! /bin/bash

sudo apt-get update -y
sudo apt-get install git ruby1.9.3 make -y
sudo gem install chef --no-ri --no-rdoc
git clone git://github.com/mingjin/retroard.git