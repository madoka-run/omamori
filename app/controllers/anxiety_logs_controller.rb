class AnxietyLogsController < ApplicationController
  def new
  end

  def create
    anxiety_log = AnxietyLog.create(anxiety_level: params[:anxiety_level], started_at: Time.current)
    redirect_to breathing_path("calming", anxiety_log_id: anxiety_log.id)
  end

  def check
    @anxiety_log = AnxietyLog.find(params[:id])
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
end