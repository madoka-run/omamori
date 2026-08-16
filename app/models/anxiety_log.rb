class AnxietyLog < ApplicationRecord
    belongs_to :user, optional: true

    def duration_in_minutes
        return nil unless ended_at

        ((ended_at - started_at)/60).round
    end

    def duration_in_words
        return nil unless duration_in_minutes

        hours = duration_in_minutes / 60
        minutes = duration_in_minutes % 60

        if hours.positive?
            "#{hours}時間#{minutes}分"
        else
            "#{minutes}分"
        end
    end

    def elapsed_minutes
        ((Time.current - started_at) / 60).round
    end
end
