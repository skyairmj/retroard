#! /bin/bash

sudo apt-get update -y
sudo apt-get install git ruby1.9.1 ruby1.9.1-dev make g++ gcc -y
sudo gem install chef --no-ri --no-rdoc
git clone git://github.com/mingjin/opscode.git