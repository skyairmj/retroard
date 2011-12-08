require 'ruby/spec_helper'

describe Team do
  it "should " do
    team = Team.new 'rca'
    team.name.should == 'rca'
  end
end
