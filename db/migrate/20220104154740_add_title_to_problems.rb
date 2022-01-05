class AddTitleToProblems < ActiveRecord::Migration[6.1]
  def change
    add_column :problems, :title, :string
  end
end
