class CreateNotifications < ActiveRecord::Migration[6.1]
  def change
    create_table :notifications do |t|
      t.integer :visitor_id, null: false
      t.integer :visited_id, null: false
      t.integer :problem_id
      t.integer :comment_id
      t.integer :solution_id
      t.string :action, default: '', null: false
      t.boolean :checked, default: false, null: false

      t.timestamps
    end

    add_index:notifications, :visitor_id
    add_index:notifications, :visited_id
    add_index:notifications, :problem_id
    add_index:notifications, :comment_id
    add_index:notifications, :solution_id
  end
end
