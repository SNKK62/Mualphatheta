class AddSourceToProblems < ActiveRecord::Migration[6.1]
  def change
    add_column :problems, :source, :string
  end
end
