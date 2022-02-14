require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  describe "GET index" do
    it "is successful" do 
      10.times do |n|
        User.create!(name: "test#{n}",password: 'password', password_confirmation: 'password')
      end
      get :index
      expect(assigns(:users).length).to eq(User.count)
    end
  end
  describe "GET show" do
    it "is successful" do
      user = User.create!(name: 'test', password: 'password',password_confirmation: 'password')
      get :show, params: {id: user.id}
      expect(assigns(:user)).to eq(user)
    end
  end
  describe "POST create" do
    it "is successful" do
      post :create, params: {user: {name: 'test', password: 'password',password_confirmation: 'password',image: '', description: 'it is a test'}}
      expect(assigns(:user)).to be_valid
    end
  end
  describe "DELETE destroy" do
    it "is successful" do
      user = User.create!(name: 'test',password: 'password', password_confirmation: 'password')
      count = User.count
      delete :destroy, params: {id: user.id}
      expect(User.count).to eq(count-1)
    end
  end
  describe "PATCH update" do
    it "is successful" do
      user = User.create!(name: 'test', password: 'password', password_confirmation: 'password', description: 'it is a test')
      patch :update, params: {id: user.id, user: {name: 'edit test', description: 'it is an edit test',image: 'nondefault'}}
      expect(assigns(:user).name).to eq('edit test')
      expect(assigns(:user).description).to eq('it is an edit test')
    end
  end
  describe "GET search" do
    it "is successful" do
      60.times do |n|
        User.create!(name: "test#{n}", password: 'password', password_confirmation: 'password')
      end
      get :search, params: {name: '1', times: 0}
      expect(assigns(:users).length).to eq(15)
      count_diff = assigns(:users).first.id > assigns(:users).last.id
      expect(count_diff).to eq(true)
    end
  end
  describe "GET search_none" do
    it "is successful" do
      60.times do |n|
        User.create!(name: "test#{n}", password: 'password', password_confirmation: 'password')
      end
      get :search_none, params:{times: 0}
      expect(assigns(:users).length).to eq(50)
      id_diff = assigns(:users).first.id > assigns(:users).last.id
      expect(id_diff).to eq(true)
    end
  end
  describe "GET logged_in" do
    it "returns true" do
      post :create, params: {user: {name: 'test', password: 'password',password_confirmation: 'password',image: '', description: 'it is a test'}}
      session[:user_id] = assigns(:user).id
      get :logged_in
      expect(assigns(:iflog)).to eq(true)
    end
    it "returns false" do
      user = User.create!(name: 'test', password: 'password', password_confirmation: 'password')
      get :logged_in
      expect(assigns(:iflog)).to eq(false)
    end
  end
  describe "GET followers" do
    it "is successful" do
      user = User.create!(name: 'test', password: 'password', password_confirmation: 'password')
      10.times do |n|
        follower = User.create!(name: "test#{n}",password: 'password',password_confirmation: 'password')
        follower.follow(user)
      end
      get :followers, params: {id: user.id}
      expect(assigns(:followers).length).to eq(10)
    end
  end
  describe "GET followings" do
    it "is successful" do
      user = User.create!(name: 'test', password: 'password', password_confirmation: 'password')
      10.times do |n|
        following = User.create!(name: "test#{n}", password: 'password', password_confirmation: 'password')
        user.follow(following)
      end
      get :followings, params:{id: user.id}
      expect(assigns(:followings).length).to eq(10)
    end
  end
  describe "GET like_problems" do
    it "is successful" do
      user = User.create!(name: 'test', password: 'password', password_confirmation: 'password')
      second_user = User.create!(name: 'test2', password: 'password', password_confirmation: 'password')
      60.times do |n|
        problem = Problem.create!(title: 'test', category: 'test',user_id: second_user.id)
        user.plike(problem)
      end
      session[:user_id] = user.id
      get :like_problems, params: {times: 0}
      expect(assigns(:problems).length).to eq(50)
    end
  end
  describe "GET like_solutions" do
    it "is successful" do 
      user = User.create!(name: 'test', password: 'password', password_confirmation: 'password')
      second_user = User.create!(name: 'test2', password: 'password', password_confirmation: 'password')
      problem = Problem.create!(title: 'test', category: 'test',description: 'it is a test',user_id: user.id)
      60.times do |n|
        solution = Solution.create!(description: 'it is a test', user_id: second_user.id, problem_id: problem.id)
        user.slike(solution)
      end
      session[:user_id] = user.id
      get :like_solutions, params: {times: 0}
      expect(assigns(:solutions).length).to eq(50)
    end
  end
  describe "GET usersolutions" do
    it "is successful" do
      user = User.create!(name: 'test', password: 'password', password_confirmation: 'password')
      problem = Problem.create!(title: 'test', category: 'test', user_id: user.id)
      60.times do |n|
        Solution.create!(description: 'it is a test',user_id: user.id, problem_id: problem.id)
      end
      get :usersolutions, params: {times: 0, id: user.id}
      expect(assigns(:solutions).length).to eq(50)
    end
  end
end
