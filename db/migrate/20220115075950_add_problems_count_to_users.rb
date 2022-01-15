class AddProblemsCountToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :problems_count, :integer
  end
end
