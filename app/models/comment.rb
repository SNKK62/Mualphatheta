class Comment < ApplicationRecord
    # include Rails.application.routes.url_helpers
    belongs_to :user
    belongs_to :problem, optional: true, counter_cache: true
    belongs_to :solution, optional: true, counter_cache: true
    validates :user_id, presence: true

    has_many :notifications, dependent: :destroy

    
    def user_image
        user.image.attached? ? user.image.url : ''
        # user.image.url
    end
    def user_name
        user.name
    end
end
