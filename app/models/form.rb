class Form < ApplicationRecord
    validates :description, presence: true
end
