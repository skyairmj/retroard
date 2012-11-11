module Retroard
  class ResourceDispatcher
    def self.dispatch resource_uri, method, request_data
      case resource_uri
      when /^\/\w+\/[\w|\s]+\/notes\/[\w|-]+$/
        named_regex = /^\/(?<retro_serial_no>\w+)\/(?<category_title>[\w|\s]+)\/notes\/(?<note_uuid>[\w|-]+)$/
        result = named_regex.match(resource_uri)
        retro_serial_no = result[:retro_serial_no]
        category_title = result[:category_title]
        note_uuid = result[:note_uuid]
        retrospective = Retrospective.find_by_serial_no retro_serial_no
        category = retrospective.categories.select{|c|c.title == category_title}.first
        case method
        when 'put'
          category.notes << Note.new({:uuid=>note_uuid, :content=>request_data[:content], :vote=>0})
        when 'post'
          base_note = category.notes.select{|n|n.uuid==note_uuid}.first
          new_subordinate = request_data[:newSubordinate]
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
          base_note.vote = request_data[:vote].to_i unless request_data[:vote].nil?
        end
        retrospective.save
      end
    end
  end
end