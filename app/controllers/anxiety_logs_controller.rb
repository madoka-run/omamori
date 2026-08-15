class AnxietyLogsController < ApplicationController
  def new
  end

  def create
    anxiety_log = AnxietyLog.create(anxiety_level: params[:anxiety_level], started_at: Time.current, user_id: current_user&.id, device_token: current_device_token)
    if params[:next] == "suggestions"
      redirect_to suggestions_anxiety_log_path(anxiety_log)
    else
      redirect_to breathing_path("calming", anxiety_log_id: anxiety_log.id)
    end
  end

  def update
    @anxiety_log = AnxietyLog.find(params[:id])

    if params[:status] == "resolved"
      @anxiety_log.update(ended_at: Time.current)
      redirect_to finished_anxiety_log_path(@anxiety_log)
    else
      redirect_to suggestions_anxiety_log_path(@anxiety_log)
    end
  end

  def finished
    @anxiety_log = AnxietyLog.find(params[:id])
  end

  def suggestions
    @anxiety_log = AnxietyLog.find(params[:id])
  end

  def index
    if user_signed_in?
      @anxiety_logs = current_user.anxiety_logs.order(started_at: :desc)
    else
      @anxiety_logs = AnxietyLog.where(user_id: nil, device_token: current_device_token).order(started_at: :desc)
    end
  end

  def destroy
    @anxiety_log = AnxietyLog.find(params[:id])
    @anxiety_log.destroy
    redirect_to anxiety_logs_path
  end
end