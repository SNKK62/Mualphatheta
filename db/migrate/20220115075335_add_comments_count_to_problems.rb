class AddCommentsCountToProblems < ActiveRecord::Migration[6.1]
  def change
    add_column :problems, :comments_count, :integer
  end
end
