require File.join(File.dirname(__FILE__), '../../../models', 'team')

describe Team do
  it "should " do
    team = Team.new 'rca'
    team.name.should == 'rca'
  end
end
