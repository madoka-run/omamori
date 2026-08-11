class AddEndedAtToAnxietyLogs < ActiveRecord::Migration[7.1]
  def change
    add_column :anxiety_logs, :ended_at, :datetime
  end
end
