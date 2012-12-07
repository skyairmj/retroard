#! /bin/bash

sudo chown -R ubuntu /usr/local/rvm
source /etc/profile.d/rvm.sh
rvm reinstall ruby-1.9.2-p290
rvm gemset create retroard
bundle install