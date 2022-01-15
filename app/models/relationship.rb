class Relationship < ApplicationRecord
    belongs_to :user, counter_cache: :following_count
    belongs_to :follow, class_name: 'User', counter_cache: :follower_count

    validates :user_id, presence: true
    validates :follow_id, presence: true
end
