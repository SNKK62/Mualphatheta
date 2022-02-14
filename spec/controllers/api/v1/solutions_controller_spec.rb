require 'rails_helper'

RSpec.describe Api::V1::SolutionsController, type: :controller do
  describe "GET index" do
    it "is successful" do
      user = User.create!(name: 'test', password: 'password', password_confirmation: 'password')
      problem = Problem.create!(title: 'test', category: 'test',user_id: user.id)
      solution = Solution.create!(description: 'it is a test', user_id: user.id, problem_id: problem.id)
      get :index, params: {id: solution.id}
      expect(assigns(:solution)).to eq(solution)
    end
  end
  describe "GET show" do
    it "is successful" do
      user = User.create!(name: 'test', password: 'password', password_confirmation: 'password')
      problem = Problem.create!(title: 'test', category: 'test',user_id: user.id)
      solution = Solution.create!(description: 'it is a test', user_id: user.id, problem_id: problem.id)
      get :show, params: {id: solution.id}
      expect(assigns(:solution)).to eq(solution)
    end
  end
  describe "POST create" do
    it "is successful" do
      user = User.create!(name: 'test', password: 'password', password_confirmation: 'password')
      problem = Problem.create!(title: 'test', category: 'test',user_id: user.id)
      session[:user_id] = user.id
      post :create, params: {id: problem.id, solution:{description: 'it is a test', image1: '', image2: '', image3: ''}}
      expect(assigns(:solution)).to be_valid
      expect(assigns(:solution).description).to eq('it is a test')
    end
  end
  describe "PATCH update" do
    it "is successful" do
      user = User.create!(name: 'test', password: 'password', password_confirmation: 'password')
      problem = Problem.create!(title: 'test', category: 'test',user_id: user.id)
      solution = Solution.create!(description: 'it is a test', user_id: user.id, problem_id: problem.id)
      patch :update, params: {solution: {description: 'it is an edit test',image1: '', image2: '', image3: ''},id: solution.id}
      expect(assigns(:solution).description).to eq('it is an edit test')
    end
  end
  describe "DELETE destroy" do
    it "is success" do
      user = User.create!(name: 'test', password: 'password', password_confirmation: 'password')
      problem = Problem.create!(title: 'test', category: 'test',user_id: user.id)
      solution = Solution.create!(description: 'it is a test', user_id: user.id, problem_id: problem.id)
      count = Solution.count
      delete :destroy, params: {id: solution.id}
      expect(Solution.count).to eq(count-1)
    end
  end
  describe "GET search" do
    it "is successful" do
      user = User.create!(name: 'test', password: 'password', password_confirmation: 'password')
      problem = Problem.create!(title: 'test', category: 'test',user_id: user.id)
      60.times do |n|
        Solution.create!(description: "it is a test#{n}", user_id: user.id, problem_id: problem.id)
      end
      get :search, params: {times: 0, id: problem.id}
      expect(assigns(:solutions).length).to eq(50)
      expect(assigns(:solutions).first.id).to eq(Solution.last.id)
    end
  end
end
