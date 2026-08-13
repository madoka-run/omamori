class ApplicationController < ActionController::Base
before_action :set_cache_headers

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
end
