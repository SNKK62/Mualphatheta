class AddSlikeCountToSolutions < ActiveRecord::Migration[6.1]
  def change
    add_column :solutions, :slike_count, :integer, default: 0
  end
end
