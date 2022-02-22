class User < ApplicationRecord
    # include Rails.application.routes.url_helpers

    attr_accessor :remember_token
    has_one_attached :image

    validates :name, presence: true, length: {maximum: 30}, uniqueness: true, allow_nil: true
    has_secure_password
    validates :password, presence: true, length: {minimum: 6},allow_nil: true
    validates :password_confirmation, presence: true, length: {minimum: 6}, allow_nil: true

    has_many :relationships, dependent: :destroy
    has_many :followings, through: :relationships, source: :follow
    has_many :reverse_of_relationships, class_name: 'Relationship', foreign_key: 'follow_id', dependent: :destroy
    has_many :followers, through: :reverse_of_relationships, source: :user

    has_many :problems, dependent: :destroy
    has_many :solutions, dependent: :destroy
    has_many :comments, dependent: :destroy

    has_many :likes, dependent: :destroy
    has_many :like_problem, through: :likes, source: :problem
    has_many :like_solution, through: :likes, source: :solution

    has_many :active_notifications, class_name: 'Notification', foreign_key: 'visitor_id', dependent: :destroy
    has_many :passive_notifications, class_name: 'Notification', foreign_key: 'visited_id', dependent: :destroy

    def image_url
        # 紐づいている画像のURLを取得する
        image.attached? ? image.url : nil
        # image.url
      end

    def follow(other_user)
        unless self == other_user
            self.relationships.find_or_create_by(follow_id: other_user.id)
        end
    end

    def unfollow(other_user)
        relationship = self.relationships.find_by(follow_id: other_user.id)
        relationship.destroy if relationship
    end

    def following?(other_user)
        self.followings.include?(other_user)
    end
    
    def User.digest(string)
        cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                      BCrypt::Engine.cost
        BCrypt::Password.create(string, cost: cost)
    end

    def User.new_token
        SecureRandom.urlsafe_base64
    end

    def remember 
        self.remember_token = User.new_token
        update_attribute(:remember_digest, User.digest(remember_token))
    end

    def authenticated?(remember_token)
        return false if remember_digest.nil?
        BCrypt::Password.new(remember_digest).is_password?(remember_token)
    end

    def forget
        update_attribute(:remember_digest,nil)
    end

    def plike(problem)
        likes.find_or_create_by(problem: problem)
    end

    def plike?(problem)
        like_problem.include?(problem)
    end

    def punlike(problem)
        like_problem.delete(problem)
    end

    def slike(solution)
        likes.find_or_create_by(solution: solution)
    end

    def slike?(solution)
        like_solution.include?(solution)
    end

    def sunlike(solution)
        like_solution.delete(solution)
    end

    def create_notification_follow!(current_user)
        temp = Notification.where(["visitor_id = ? and visited_id = ? and action = ? ",current_user.id, id, 'follow'])
        if temp.blank?
            notification = current_user.active_notifications.new(
            visited_id: id, 
            action: 'follow'
            )
            notification.save if notification.valid?
        end
    end

    def create_notification_problem!(current_user,problem_id)
        temp_ids  = followers.select(:id).distinct
        temp_ids.each do |temp_id|
            save_notification_problem!(current_user, problem_id, temp_id.id)
        end
    end

    def save_notification_problem!(current_user, problem_id, visited_id)
        if current_user.id != visited_id
            notification = current_user.active_notifications.new(
                problem_id: problem_id,
                visited_id: visited_id,
                action: 'problem'
            )
            notification.save if notification.valid?
        end

    end
end
