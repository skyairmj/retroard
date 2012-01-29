require 'ruby/spec_helper'

describe Sticky do
  def set_db_base_line
    empty_db
    team = Team.create(:name => 'rca')
    team.sections << Section.create(:name => 'well')
  end

  def empty_db
    DBClearer.clear_all
  end

  before(:each) do
    set_db_base_line
    @data = {:section => 'well',
            :uuid => 'uuid',
            :lastModified => '',
            :content => 'sample',
            :teamName => 'rca'}
  end

  after(:each) do
    empty_db
  end

  it "should save sticky and associate it with team and section when it doesn't exist" do
    Sticky.save @data
    team = Team.find_by_name('rca')
    team.should_not be_nil
    team.sections.size.should == 1;
    team.section('well').stickies[0].uuid.should == 'uuid'
  end

  it "should update sticky when sticky already exist" do
    Sticky.save @data
    Sticky.save ({:section => 'well',
            :uuid => 'uuid',
            :lastModified => '',
            :content => 'changed content',
            :teamName => 'rca'})
    sticky = Sticky.find_by_uuid('uuid')
    sticky.content.should == "changed content"
  end

end