class BreathingsController < ApplicationController
  BREATHING_METHODS = {
    "calming" => {
      name: "落ち着く呼吸法",
      inhale: 4,
      hold: 4,
      exhale: 4
    }
  }.freeze

  def show
    @breathing = BREATHING_METHODS[params[:id]]
  end
end
