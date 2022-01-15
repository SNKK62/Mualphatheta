class Like < ApplicationRecord

    belongs_to :user 
    belongs_to :problem, optional: true, counter_cache: :plike_count
    belongs_to :solution, optional: true, counter_cache: :slike_count
end
