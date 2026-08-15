class AddDeviceTokenToAnxietyLogs < ActiveRecord::Migration[7.1]
  def change
    add_column :anxiety_logs, :device_token, :string
  end
end
