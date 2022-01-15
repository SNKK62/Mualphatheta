class AddSolutionsCountToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :solutions_count, :integer
  end
end
