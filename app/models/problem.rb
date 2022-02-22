class Problem < ApplicationRecord
    # include Rails.application.routes.url_helpers

    has_one_attached :image1
    has_one_attached :image2
    has_one_attached :image3
    belongs_to :user, counter_cache: true
    validates :user_id, presence: true
    validates :category, presence: true

    has_many :solutions, dependent: :destroy
    has_many :comments, dependent: :destroy

    has_many :likes, dependent: :destroy
    has_many :users, through: :likes

    has_many :notifications, dependent: :destroy

    def image1_url
        # 紐づいている画像のURLを取得する
        image1.attached? ? image1.url : ''
    end
    def image2_url
        # 紐づいている画像のURLを取得する
        image2.attached? ? image2.url : ''
    end
    def image3_url
        # 紐づいている画像のURLを取得する
        image3.attached? ? image3.url : ''
    end
    def user_image
        user.image.attached? ? user.image.url: ''
        # user.image.url
    end
    def user_name
        user.name
    end

    def iflike 
        user.plike?(problem)
    end

    def update_time_of_problem
        updated_at.strftime("%Y/%m/%d")
    end

    def create_notification_comment!(current_user, comment_id)
        temp_ids  = Comment.select(:user_id).where(problem_id: id).where.not(user_id: current_user.id).distinct
        temp_ids.each do |temp_id|
            save_notification_comment!(current_user, comment_id, temp_id['user_id'])
        end
        save_notification_comment!(current_user, comment_id, user_id) if !temp_ids.exists?(user_id: user_id)
    end

    def save_notification_comment!(current_user, comment_id, visited_id)
        if current_user.id != visited_id
            notification = current_user.active_notifications.new(
                problem_id: id,
                comment_id: comment_id,
                visited_id: visited_id,
                action: 'comment'
            )
            notification.save if notification.valid?
        end

    end

    def create_notification_solution!(current_user, solution_id)
        temp_ids  = Solution.select(:user_id).where(problem_id: id).where.not(user_id: current_user.id).distinct
        temp_ids.each do |temp_id|
            save_notification_solution!(current_user, solution_id, temp_id['user_id'])
        end
        save_notification_solution!(current_user, solution_id, user_id) if !temp_ids.exists?(user_id: user_id)
    end

    def save_notification_solution!(current_user, solution_id, visited_id)
        if current_user.id != visited_id
            notification = current_user.active_notifications.new(
                problem_id: id,
                solution_id: solution_id,
                visited_id: visited_id,
                action: 'solution'
            )
            notification.save if notification.valid?
        end

    end
end
