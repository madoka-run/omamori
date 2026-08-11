class AnxietyLog < ApplicationRecord
    def duration_in_minutes
        return nil unless ended_at

        ((ended_at - started_at)/60).round
    end

end
