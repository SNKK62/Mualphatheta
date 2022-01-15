class AddCommentsCountToSolutions < ActiveRecord::Migration[6.1]
  def change
    add_column :solutions, :comments_count, :integer
  end
end
