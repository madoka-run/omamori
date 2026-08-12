class AddUserRefToAnxietyLogs < ActiveRecord::Migration[7.1]
  def change
    add_reference :anxiety_logs, :user, null: true, foreign_key: true
  end
end
