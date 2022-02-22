class Notification < ApplicationRecord
    default_scope -> {order(created_at: :desc)}
    belongs_to :problem, optional: true
    belongs_to :solution, optional: true
    belongs_to :comment, optional: true

    belongs_to :visitor, class_name: 'User', foreign_key: 'visitor_id', optional: true
    belongs_to :visited, class_name: 'User', foreign_key: 'visited_id', optional: true

    def user
        User.find(visitor_id)
    end     
    
    def problem
        p_id = problem_id
        if p_id 
            Problem.find(p_id)
        else
            'none'
        end
    end

    def solution
        s_id = solution_id
        if s_id
            Solution.find(s_id).user
        else
            'none'
        end
    end
end
