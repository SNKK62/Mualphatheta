class Solution < ApplicationRecord
    # include Rails.application.routes.url_helpers

    has_one_attached :image1
    has_one_attached :image2
    has_one_attached :image3

    has_many :comments,dependent: :destroy
    belongs_to :user
    belongs_to :problem
    validates :user_id, presence: true
    validates :problem_id, presence: true

    has_many :likes, dependent: :destroy
    has_many :users, through: :likes

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

    def slike_count
        users.count
    end

    def title
        problem.title
    end

    def category
        problem.category
    end

    def update_time_of_solution
        updated_at.strftime("%Y/%m/%d")
    end
end
