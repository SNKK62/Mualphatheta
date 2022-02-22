class Solution < ApplicationRecord
    # include Rails.application.routes.url_helpers

    has_one_attached :image1
    has_one_attached :image2
    has_one_attached :image3

    has_many :comments,dependent: :destroy
    belongs_to :user, counter_cache: true
    belongs_to :problem, counter_cache: true
    validates :user_id, presence: true
    validates :problem_id, presence: true

    has_many :likes, dependent: :destroy
    has_many :users, through: :likes

    has_many :notifications, dependent: :destroy


    def image1s_url
        # 紐づいている画像のURLを取得する
        image1.attached? ? image1.url : ''
    end
    def image2s_url
        # 紐づいている画像のURLを取得する
        image2.attached? ? image2.url : ''
    end
    def image3s_url
        # 紐づいている画像のURLを取得する
        image3.attached? ? image3.url : ''
    end
    def user_image
        user.image.attached? ? user.image.url : ''
        # user.image.url
    end
    def user_name
        user.name
    end

    def title
        problem.title
    end

    def category
        problem.category
    end

    def title
        problem.title
    end

    def iflike 
        user.slike?(problem)
    end

    def update_time_of_solution
        updated_at.strftime("%Y/%m/%d")
    end

    def create_notification_comment!(current_user, comment_id)
        temp_ids  = Comment.select(:user_id).where(solution_id: id).where.not(user_id: current_user.id).distinct
        temp_ids.each do |temp_id|
            save_notification_comment!(current_user, comment_id, temp_id['user_id'])
        end
        save_notification_comment!(current_user, comment_id, user_id) if !temp_ids.exists?(user_id: user_id)
    end

    def save_notification_comment!(current_user, comment_id, visited_id)
        if current_user.id != visited_id
            notification = current_user.active_notifications.new(
                solution_id: id,
                comment_id: comment_id,
                visited_id: visited_id,
                action: 'comment'
            )
            notification.save if notification.valid?
        end

    end
end
