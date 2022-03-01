class AddLevelToProblems < ActiveRecord::Migration[6.1]
  def change
    add_column :problems, :level, :string
  end
end
