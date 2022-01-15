class AddSolutionsCountToProblems < ActiveRecord::Migration[6.1]
  def change
    add_column :problems, :solutions_count, :integer, default: 0
  end
end
