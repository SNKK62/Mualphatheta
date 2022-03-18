class CreateForms < ActiveRecord::Migration[6.1]
  def change
    create_table :forms do |t|
      t.text :description
      t.timestamps
    end
  end
end
