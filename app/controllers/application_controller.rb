class ApplicationController < ActionController::Base
before_action :set_cache_headers
before_action :set_active_anxiety_log

    def after_sign_in_path_for(resource)
        if params[:anxiety_log_id].present?
            anxiety_logs_path
        else
            new_anxiety_log_path
        end
    end

    private

    def set_cache_headers
        response.headers["Cache-Control"] = "no-store"
    end

    def current_device_token
        cookies.permanent[:device_token] ||= SecureRandom.uuid
    end

    def set_active_anxiety_log
        @active_anxiety_log = if user_signed_in?
            current_user.anxiety_logs.find_by(ended_at: nil)
        else
            AnxietyLog.find_by(user_id: nil, device_token: current_device_token, ended_at: nil)
        end
    end
end
