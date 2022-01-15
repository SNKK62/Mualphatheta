class AddFollowingCountToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :following_count, :integer
  end
end
