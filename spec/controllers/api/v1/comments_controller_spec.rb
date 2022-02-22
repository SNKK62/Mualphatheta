require 'rails_helper'

RSpec.describe Api::V1::CommentsController, type: :controller do
  describe "GET show" do
    it "is successful" do
      user = User.create!(name: 'test',password: 'password',password_confirmation: 'password')
      puts user.id
      comment = Comment.create!(text: 'it is a test', user_id: user.id)
      get :show, params: {id: comment.id}
      expect(assigns(:comment)).to eq(comment)
    end
  end
  describe "POST problem_create" do
    it "is successful" do
      user = User.create!(name: 'test',password: 'password',password_confirmation: 'password')
      problem = Problem.create!(title: 'test',category: 'test',user_id: user.id)
      session[:user_id] = user.id
      post :problem_create , params: {comment: {text: 'it is a post test!'},id: problem.id}
      expect(assigns(:comment)).to be_valid
      expect(assigns(:comment).text).to eq('it is a post test!')
    end
  end
  describe "POST solution_create" do
    it "is successful" do
      user = User.create!(name: 'test',password: 'password',password_confirmation: 'password')
      problem = Problem.create!(title: 'test', category: 'test', user_id: user.id)
      solution = Solution.create!(description: "it's a test", user_id: user.id, problem_id: problem.id)
      session[:user_id] = user.id
      post :solution_create, params: {comment: {test: 'it is a post test!'}, id: solution.id}
      expect(assigns(:comment)).to be_valid
    end
  end
  describe "PATCH update" do
    it "is successful" do
      user = User.create!(name: 'test',password: 'password',password_confirmation: 'password')
      comment = Comment.create!(text: 'it is a test', user_id: user.id)
      patch :update, params: {comment: {text: 'it is a edit test'}, id: comment.id}
      expect(assigns(:comment)).to be_valid
      expect(assigns(:comment).text).to eq('it is a edit test')
    end
  end
  describe "DELETE destroy" do
    it "is successful" do
      user = User.create!(name: 'test',password: 'password',password_confirmation: 'password')
      comment = Comment.create!(text: 'it is a test', user_id: user.id)
      count = Comment.count
      session[:user_id] = user.id
      delete :destroy, params: {id: comment.id}
      expect(Comment.count).to eq(count-1)
    end
  end
  describe "GET search_from_problem" do
    it "is successful" do
      user = User.create!(name: 'test',password: 'password',password_confirmation: 'password')
      problem = Problem.create!(title: 'test', category: 'test',user_id: user.id)
      60.times do |n|
        Comment.create!(text:"it is a test#{n}",problem_id: problem.id,user_id: user.id)
      end
      get :search_from_problem, params: {times: 0, id: problem.id }
      expect(assigns(:comments).length).to eq(50)
      expect(assigns(:comments).first.id).to eq(Comment.count)
    end
  end
  describe "GET search_from_solution" do
    it "is successful" do
      user = User.create!(name: 'test',password: 'password',password_confirmation: 'password')
      problem = Problem.create!(title: 'test', category: 'test',user_id: user.id)
      solution = Solution.create!(description: 'test',problem_id: problem.id, user_id: user.id)
      60.times do |n|
        Comment.create!(text: "it is a test#{n}",solution_id: solution.id, user_id: user.id)
      end
      get :search_from_solution, params: {times: 0, id: solution.id}
      expect(assigns(:comments).length).to eq(50)
      expect(assigns(:comments).first.id).to eq(Comment.count)
    end
  end
end
