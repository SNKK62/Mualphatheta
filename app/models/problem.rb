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

    def update_time_of_problem
        updated_at.strftime("%Y/%m/%d")
    end
end
