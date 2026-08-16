class HomeController < ApplicationController
  def top
    @active_anxiety_log = if user_signed_in?
      current_user.anxiety_logs.find_by(ended_at: nil)
    else
      AnxietyLog.find_by(user_id: nil, device_token: current_device_token, ended_at: nil)
    end
  end
end
