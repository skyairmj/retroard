#! /bin/bash

sudo chown -R ubuntu /usr/local/rvm
rvm reinstall ruby-1.9.2-p290
rvm gemset create retroard
bundle install