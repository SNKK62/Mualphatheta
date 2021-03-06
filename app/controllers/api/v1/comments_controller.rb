class Api::V1::CommentsController < ApplicationController
skip_before_action :verify_authenticity_token

    def show
        @comment = Comment.find(params[:id])
        user = @comment.user
        user_name = user.name
        user_image = user.image_url
        render json: {comment: @comment, user_name: user_name, user_image: user_image}
    end

    def problem_create
        @comment = current_user.comments.new(comment_params)
        @comment[:problem_id] = params[:id]
        problem = @comment.problem
        if @comment.save
            problem.create_notification_comment!(current_user, @comment.id)
            render json: {id: @comment.id}
        else
            puts @comment.errors.full_messages
            render json: {error: @comment.errors}, status: 422
        end
    end

    def solution_create
        @comment = current_user.comments.new(comment_params)
        @comment[:solution_id] = params[:id]
        solution = @comment.solution
        if @comment.save
            solution.create_notification_comment!(current_user, @comment.id)
            render json: {id: @comment.id}
        else
            render json: {error: @comment.errors}, status: 422
        end
    end

    def update
        @comment = Comment.find(params[:id])
        if @comment.update_attribute(:text, comment_params[:text])
            render json: {comment: @comment}
        else
            render json: {message: @comment.errors}, status: 422
        end
    end

    def destroy
        comment = Comment.find(params[:id])
        if current_user.id == comment.user.id
            if comment.destroy
                render json: {message: '削除しました'}
            else
                render json: {error: comment.errors}, status: 422
            end
        end
    end
    def search_from_problem 
        times =params[:times].to_i
        problem = Problem.find(params[:id])
        @comments = problem.comments.order(updated_at: :DESC).limit(50).offset(50*times)
        ifend = problem.comments.length < 50*times+50
        render json: {comment: @comments, ifend: ifend}, methods: [:user_image,:user_name]
    end
    def search_from_solution 
        times =params[:times].to_i
        solution = Solution.find(params[:id])
        @comments = solution.comments.order(updated_at: :DESC).limit(50).offset(50*times)
        ifend = solution.comments.length < 50*times+50
        render json: {comment: @comments, ifend: ifend}, methods: [:user_image,:user_name]
    end

    private
    def comment_params
        params.require(:comment).permit(:text)
    end
end
