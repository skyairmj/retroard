retro = Retroard::Retrospective.new({:serial_no => '1'})
well = Retroard::Category.new({:title => 'Well'})
less_well = Retroard::Category.new({:title => 'LessWell'})
idea = Retroard::Category.new({:title => 'Idea'})
puzzle = Retroard::Category.new({:title => 'Puzzle'})
retro.categories += [well, less_well, idea, puzzle]
retro.save