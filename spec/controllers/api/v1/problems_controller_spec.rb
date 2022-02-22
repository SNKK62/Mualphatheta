require 'rails_helper'

RSpec.describe Api::V1::ProblemsController, type: :controller do
  describe "GET show" do
    it "is successful" do
      user = User.create!(name: 'test', password: 'password', password_confirmation: 'password')
      problem = Problem.create!(title: 'test', category: 'test',user_id: user.id)
      get :show, params: {id: problem.id}
      expect(assigns(:problem)).to eq(problem)
    end
  end
  describe "POST create" do
    it "is successful" do
      user = User.create!(name: 'test', password: 'password', password_confirmation: 'password')
      session[:user_id] = user.id
      post :create, params: {problem: {title: 'test', category: 'test', description: 'it is a test', image1:'', image2: '', image3: ''}}
      expect(assigns(:problem)).to be_valid
    end
  end
  describe "PATCH update" do
    it "is successful" do
      user = User.create!(name: 'test', password: 'password', password_confirmation: 'password')
      problem = Problem.create!(title: 'test', category: 'test', description: 'it is a test',user_id: user.id)
      patch  :update, params: {problem: {title: 'edit test', category: 'edit test', description: 'it is an edit test',image1: '', image2: '', image3: ''}, id: problem.id}
      expect(assigns(:problem).title).to eq('edit test')
      expect(assigns(:problem).category).to eq('edit test')
      expect(assigns(:problem).description).to eq('it is an edit test')
    end
  end
  describe "DELETE destroy" do
    it "is successful" do
      user = User.create!(name: 'test', password: 'password', password_confirmation: 'password')
      problem = Problem.create!(title: 'test', category: 'test',user_id: user.id)
      count = Problem.count
      session[:user_id] = user.id
      delete :destroy, params: {id: problem.id}
      expect(Problem.count).to eq(count-1)
    end
  end
  describe "GET search" do
    it "is successful" do
      user = User.create!(name: 'test', password: 'password', password_confirmation: 'password')
      60.times do |n|
        Problem.create!(title: 'test', category: "test#{n}",user_id: user.id)
      end
      get :search, params: {category: '1', times: 0}
      id_diff = assigns(:problems).first.id > assigns(:problems).last.id
      expect(assigns(:problems).length).to eq(15)
      expect(id_diff).to eq(true)
    end
  end
  describe "GET search_none" do
    it "is successful" do
      user = User.create!(name: 'test', password: 'password', password_confirmation: 'password')
      60.times do |n|
        Problem.create!(title: 'test', category: 'test',user_id: user.id)
      end
      get :search_none, params: {times: 0}
      expect(assigns(:problems).length).to eq(50)
      expect(assigns(:problems).first.id > assigns(:problems).last.id).to eq(true)
    end
  end
  describe "GET user_problem" do
    it "is successful" do
      user = User.create!(name: 'test', password: 'password', password_confirmation: 'password')
      60.times do |n|
        Problem.create!(title: 'test', category: 'test',user_id: user.id)
      end
      get :user_problem, params: {times: 0, id: user.id}
      expect(assigns(:problems).length).to eq(50)
      expect(assigns(:problems).first.id > assigns(:problems).last.id).to eq(true)
    end
  end
  describe "GET rank_problem" do
    it "is successful" do
      60.times do |n|
        User.create!(name: "test#{n}", password: 'password', password_confirmation: 'password')
      end
      user = User.last
      init_id = User.first.id
      60.times do |n|
        problem = Problem.create!(title: 'test', category: 'test',user_id: user.id)
        if n>=0 
          (n+1).times do |i|
            User.find(init_id+i).plike(problem)
          end
        end
      end
      get :rank_problem, params: {times: 0}
      expect(assigns(:problems).length).to eq(Problem.count)
      expect(assigns(:problems).first.plike_count > assigns(:problems).last.plike_count).to eq(true)
    end
  end
  describe "GET recommend_problem" do
    it "is successful" do
      fuser = User.create!(name: 'ftest', password: 'password', password_confirmation: 'password')
      60.times do |n|
        Problem.create!(title: 'test', category: 'test',user_id: fuser.id)
      end
      suser = User.create!(name: 'stest', password: 'password', password_confirmation: 'password')
      60.times do |n|
        Problem.create!(title: 'test', category: 'test',user_id: suser.id)
      end
      session[:user_id] = suser.id
      get :recommend_problem, params: {times: 0}
      expect(assigns(:problems).length).to eq(Problem.count)
      expect(assigns(:problems).first.user.name).to eq(fuser.name)
    end
  end
end
