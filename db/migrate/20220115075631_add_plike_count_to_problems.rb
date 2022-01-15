class AddPlikeCountToProblems < ActiveRecord::Migration[6.1]
  def change
    add_column :problems, :plike_count, :integer, default: 0
  end
end
