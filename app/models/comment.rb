class Comment < ApplicationRecord
    belongs_to :user
    belongs_to :problem, optional: true
    belongs_to :solution, optional: true
    validates :user_id, presence: true
    
    def user_image
        user.image.attached? ? user.image.url : ''
        # user.image.url
    end
    def user_name
        user.name
    end
end
