enable :inline_templates, :method_override, :sessions, :logging
disable :run

@@sections_info = [
    {:id => "well", :display => "WELL"},
    {:id => "lessWell", :display => "LESS WELL"},
    {:id => "puzzle", :display => "PUZZLE"},
    {:id => "idea", :display => "IDEA"}
]

get '/' do
    erb :index
end

post '/signin' do
  unless params[:team].nil?
    redirect "/#{params[:team]}/retro/1", 303
  end
end

post '/signup' do
  unless params[:team].nil?
    redirect "/#{params[:team]}/retro/1", 303
  end
end

get '/:team/retro/:retroId' do
  @sections = @@sections_info
  @team = Team.find_by_name(params[:team]) || new_team_with_sections(params[:team])
  erb :board
end

get '/:team' do
  "hello! #{params[:team]}"
end

get '/:team/retro/:id/sticky/?' do
  @team = Team.find_by_name(params[:team]) || new_team_with_sections(params[:team])
  team_hash = {}
  @team.sections.each do |section|
    team_hash.merge! section.name => section_hash(section)
  end
  content_type :json
  team_hash.to_json
end

def section_hash section
  hash = {}
  section.stickies.find(:all, :order => [:created_at]).each do |sticky|
    hash.merge! sticky.uuid => {'content' => sticky.content}
  end
  hash
end

def new_team_with_sections team_name
  team = Team.create(:name => team_name)
  @@sections_info.each do |section_info|
    section = Section.create(:name => section_info[:id])
    team.sections << section
  end

  team
end