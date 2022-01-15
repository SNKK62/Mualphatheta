class AddCommentsCountToProblems < ActiveRecord::Migration[6.1]
  def change
    add_column :problems, :comments_count, :integer, default: 0
  end
end
