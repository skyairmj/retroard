require File.join(File.dirname(__FILE__), '../../../model', 'team')

describe Team do
  it "should " do
    team = Team.new 'rca'
    team.name.should == 'rca'
  end
end