class AddUnitToProblems < ActiveRecord::Migration[6.1]
  def change
    add_column :problems, :unit, :string
  end
end
