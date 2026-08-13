class BreathingsController < ApplicationController
  BREATHING_METHODS = {
    "calming" => {
      name: "落ち着く呼吸法",
      inhale: 4,
      hold: 4,
      exhale: 4,
      cycles: 5
    }
  }.freeze

  def show
    @breathing = BREATHING_METHODS[params[:id]]
    @anxiety_log = AnxietyLog.find(params[:anxiety_log_id])
  end
end
