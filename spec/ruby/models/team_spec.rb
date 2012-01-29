require 'ruby/spec_helper'

describe Team do
  it "should return right section" do
    section1 = Section.create(:name => "section1")
    section2 = Section.create(:name => "section2")

    team = Team.create(:name => "test_team")
    team.sections << [section1, section2]

    team.section("section1").should == section1
  end
end