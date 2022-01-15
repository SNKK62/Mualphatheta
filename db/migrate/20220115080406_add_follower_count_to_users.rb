class AddFollowerCountToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :follower_count, :integer
  end
end
