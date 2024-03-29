class Api::V1::ProblemsController < ApplicationController
skip_before_action :verify_authenticity_token

    def index
        @problem = Problem.find(params[:id])
        render json: {problem: @problem}
    end

    def show
        @problem = Problem.find(params[:id])
        user = @problem.user
        user_name = user.name
        user_image = user.image_url
        render json: {problem: @problem, user_name: user_name, user_image: user_image}, methods: [:image1_url, :image2_url, :image3_url]
    end

    def create
        @problem = current_user.problems.new(problem_params.except(:image1,:image2,:image3))
        if problem_params[:image1] != ''
            @problem.image1.attach(problem_params[:image1])
        end
        if problem_params[:image2] != ''
            @problem.image2.attach(problem_params[:image2])
        end
        if problem_params[:image3] != ''
            @problem.image3.attach(problem_params[:image3])
        end
        if @problem.save
            user = @problem.user
            user.create_notification_problem!(current_user, @problem.id)
            render json: {id: @problem.id}
        else
            render json: {error: @problem.errors}, status: 422
        end
    end

    def update
        @problem = Problem.find(params[:id])
        if @problem.update(problem_params.except(:image1,:image2,:image3))
            @problem.update(source: problem_params[:source])
            @problem.update(level: problem_params[:level])
            @problem.update(unit: problem_params[:unit])
            if problem_params[:image1] == '' && @problem.image1.attached? 
                @problem.image1.purge 
            elsif problem_params[:image1] != ''
                if problem_params[:image1] == '1'
                elsif @problem.image1.attached?
                    @problem.image1.purge
                    @problem.image1.attach(problem_params[:image1])
                else
                    @problem.image1.attach(problem_params[:image1])
                end
            end
            
            if problem_params[:image2] == '' && @problem.image2.attached?
                @problem.image2.purge 
            elsif problem_params[:image2] != '' 
                if problem_params[:image2] == '2'
                elsif @problem.image2.attached?
                    @problem.image2.purge
                    @problem.image2.attach(problem_params[:image2])
                else
                    @problem.image2.attach(problem_params[:image2])
                end
            end
            if problem_params[:image3] == '' && @problem.image3.attached?
                @problem.image3.purge 
            elsif problem_params[:image3] != '' 
                if problem_params[:image3] == '3'
                elsif @problem.image3.attached?
                    @problem.image3.purge
                    @problem.image3.attach(problem_params[:image3])
                else 
                    @problem.image3.attach(problem_params[:image3])
                end
            end
                
            render json: {problem: @problem}
        else
            render json: {error: @problem.errors}, status: 422
        end
    end
    
    def destroy
        problem = Problem.find(params[:id])
        if current_user.id == problem.user.id
            if problem.destroy
                render json: {message: '削除しました'}
            else
                render json: {error: problem.errors}, status: 422
            end
        end
    end

    def search
        query = params[:category]
        times = params[:times].to_i
        ifend = Problem.where('category LIKE ?', '%'+query+'%').or(Problem.where('title LIKE ?', '%'+query+'%')).order(updated_at: :DESC).length < 50*times+50
        @problems = Problem.where('category LIKE ?', '%'+query+'%').or(Problem.where('title LIKE ?', '%'+query+'%')).order(updated_at: :DESC).limit(50).offset(50*times)
        render json: {problem: @problems, ifend: ifend},methods: [:user_image,:user_name,:update_time_of_problem]
    end

    def search_none
        times = params[:times].to_i
        @problems = Problem.all.order(updated_at: :DESC).limit(50).offset(50*times)
        ifend = Problem.all.order(updated_at: :DESC).length < 50*times+50
        render json: {problem: @problems, ifend: ifend}, methods: [:user_image,:user_name,:update_time_of_problem]
    end

    def user_problem
        times = params[:times].to_i
        user = User.find(params[:id])
        ifend = user.problems.length < 50*times+50
        @problems = user.problems.order(updated_at: :DESC).limit(50).offset(50*times)
        render json: {problem: @problems, ifend: ifend}, methods: [:user_name,:update_time_of_problem]
    end

    def rank_problem
        times = params[:times].to_i
        @problems = Problem.all.sort{|a,b| b.likes.size <=> a.likes.size }
        ifend = Problem.all.size < 50*times+50
        render json: {problem: @problems[50*times,50], ifend: ifend}, methods: [:user_image, :user_name, :update_time_of_problem]
    end

    def recommend_problem
        times = params[:times].to_i
        ifend = Problem.all.size < 50*times+50
        followings_ids = current_user.followings.ids
        @problems = Problem.all.sort_by{|a| [id_of_following?(a.user_id,followings_ids),-a.updated_at.to_i]}
        render json: {problem: @problems[50*times,50], ifend: ifend}, methods: [ :user_image, :user_name, :update_time_of_problem]
    end

    def level_problem
        times = params[:times].to_i
        @problems = Problem.where(level: params[:level]).or(Problem.where('category LIKE ?', '%'+params[:level]+'%')).or(Problem.where('title LIKE ?', '%'+params[:level]+'%')).order(updated_at: :DESC)
        ifend = @problems.length < 50*times+50
        render json: {problem: @problems.limit(50).offset(50*times), ifend: ifend}, methods: [:user_image, :user_name, :update_time_of_problem]
    end

    def unit_problem
        times = params[:times].to_i
        @problems = Problem.where(unit: params[:unit]).or(Problem.where('category LIKE ?', '%'+params[:unit]+'%')).or(Problem.where('title LIKE ?', '%'+params[:unit]+'%')).order(updated_at: :DESC)
        ifend = @problems.length < 50*times+50
        render json: {problem: @problems.limit(50).offset(50*times), ifend: ifend}, methods: [:user_image, :user_name, :update_time_of_problem]
    end
    
    private
        def problem_params
            params.require(:problem).permit(:title, :image1, :image2, :image3, :description, :category, :source, :level, :unit)
        end

        def id_of_following?(id,ids)
            if ids.include?(id)
                return -1
            elsif id == current_user.id
                return 1
            else
                return 0
            end
        end
end
