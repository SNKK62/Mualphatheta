class AddIdealToProblems < ActiveRecord::Migration[6.1]
  def change
    add_column :problems, :ideal, :boolean, default: false
  end
end
