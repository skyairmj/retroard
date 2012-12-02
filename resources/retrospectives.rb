module Retroard
  class Retrospectives < Sinatra::Base
    include GUID
    
    put '/:retro_serial_no/:category_title/notes/:note_uuid' do
      retro_serial_no = params[:retro_serial_no]
      category_title = params[:category_title]
      note_uuid = params[:note_uuid]
      note_content = params[:content]
      retrospective = Retrospective.find_by_serial_no retro_serial_no
      category = retrospective.categories.select{|c|c.title == category_title}.first
      
      category.notes << Note.new({:uuid=>note_uuid, :content=>note_content, :vote=>0})

      retrospective.save
    end
    
    post '/:retro_serial_no/:category_title/notes/:note_uuid' do
      retro_serial_no = params[:retro_serial_no]
      category_title = params[:category_title]
      note_uuid = params[:note_uuid]
      note_content = params[:content]
      note_new_subordinate = params[:newSubordinate]
      note_vote = params[:vote]
      
      retrospective = Retrospective.find_by_serial_no retro_serial_no
      category = retrospective.categories.select{|c|c.title == category_title}.first

      base_note = category.notes.select{|n|n.uuid==note_uuid}.first
      new_subordinate = note_new_subordinate
      unless new_subordinate.nil?
        source_category = retrospective.categories.select{|c|c.title == new_subordinate[:category]}.first
        new_subordinate_note = source_category.notes.select{|n|n.uuid == new_subordinate[:uuid]}.first
        source_category.notes.delete new_subordinate_note
        base_note.subordinates << new_subordinate_note 
        unless new_subordinate_note.subordinates.empty?
          base_note.subordinates += new_subordinate_note.subordinates
          new_subordinate_note.subordinates.clear
        end
        base_note.vote += new_subordinate_note.vote
      end
      base_note.vote = note_vote.to_i unless note_vote.nil?
    
      retrospective.save
    end
    
    get %r{^/([\w]+)$} do |retrospective_id|
      return unless request.xhr?
      
      content_type :json
      retro = Retrospective.find_by_serial_no(retrospective_id)
      if retro.nil? 
        raise Sinatra::NotFound
      else
        retro.to_json
      end
    end
    
    put '/' do
      retro = Retrospective.new({:serial_no => short})
      well = Category.new({:title => 'Well'})
      less_well = Category.new({:title => 'LessWell'})
      idea = Category.new({:title => 'Idea'})
      puzzle = Category.new({:title => 'Puzzle'})
      retro.categories += [well, less_well, idea, puzzle]
      retro.save
      redirect "/result.html#!/#{retro.serial_no}", 303
    end    
  end
end