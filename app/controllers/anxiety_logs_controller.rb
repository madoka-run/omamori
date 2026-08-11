class AnxietyLogsController < ApplicationController
  def new
  end

  def create
    AnxietyLog.create(anxiety_level: params[:anxiety_level], started_at: Time.current)
    redirect_to breathing_path("calming")
  end

  def check 
    @anxiety_log = AnxietyLog.find(params[:id])
  end
end

