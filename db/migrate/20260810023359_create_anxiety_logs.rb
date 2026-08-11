class CreateAnxietyLogs < ActiveRecord::Migration[7.1]
  def change
    create_table :anxiety_logs do |t|
      t.integer :anxiety_level
      t.datetime :started_at

      t.timestamps
    end
  end
end
