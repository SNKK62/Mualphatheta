class Api::V1::NotificationsController < ApplicationController
    skip_before_action :verify_authenticity_token
    def index
        user = User.find(params[:id])
        @notification = user.passive_notifications.limit(100)
        exist = @notification.exists?(checked: false)
        render json: {notification: @notification, exist: exist}, methods: [:user,:problem, :solution]
    end

    def update
        user = User.find(params[:id])
        notifications = user.passive_notifications.where(checked: false)
        if current_user.id == user.id
            notifications.each do |notification|
                notification.update(checked: true)
            end
            render json: 'update is suceeded'
        end
    end
end
