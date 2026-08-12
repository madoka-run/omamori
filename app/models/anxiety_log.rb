class AnxietyLog < ApplicationRecord
    belongs_to :user, optional: true
    
    def duration_in_minutes
        return nil unless ended_at

        ((ended_at - started_at)/60).round
    end

    def elapsed_minutes
        ((Time.current - started_at) / 60).round
    end

end
