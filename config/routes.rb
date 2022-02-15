Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1, format: 'json' do
      resources :users do
        member do
          get :followings, :followers
          get :show_image
          get '/solutions/:times' => 'users#usersolutions'
        end
        collection do
          get '/search/:times/:name' => 'users#search'
          get '/search/:times' => 'users#search_none'
          post '/follow/:id', to: 'relationships#create'
          delete '/unfollow/:id', to: 'relationships#destroy'
          get '/iffollow/:id', to: 'relationships#iffollow'
          get '/like_problems/:times' => 'users#like_problems'
          get '/like_solutions/:times' => 'users#like_solutions'
        end
      end
      resources :problems, except: [:index] do 
        member do 
          post '/like', to: 'likes#problem_create'
          delete '/unlike', to: 'likes#problem_destroy'
          get '/iflike', to: 'likes#ifplike'
          # post '/comments/' => 'comments#problem_create'
        end
        collection do
          get '/search/:times/:category' => 'problems#search'
          get '/search/:times' => 'problems#search_none'
          get '/rank/:times' => 'problems#rank_problem'
          get '/recommend/:times' => 'problems#recommend_problem'
        end
      end
      resources :solutions, except: [:create] do 
        member do 
          post '/like', to: 'likes#solution_create'
          delete '/unlike', to: 'likes#solution_destroy'
          get '/iflike', to: 'likes#ifslike'
        end
      end
      resources :comments, except: [:create]


      resources :relationships, only: [:create, :destroy]
      post '/login', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'
      get '/logged_in' => 'users#logged_in'

      post '/problems/:id/comments' => 'comments#problem_create'
      get '/problems/:id/comments/:times' => 'comments#search_from_problem'
      post '/problems/:id/solutions' => 'solutions#create'
      get '/problems/:id/solutions/:times' => 'solutions#search'
      get '/users/:id/problems/:times' => 'problems#user_problem'


      post '/solutions/:id/comments' => 'comments#solution_create'
      get '/solutions/:id/comments/:times' => 'comments#search_from_solution'
      

    end
  end

  get '/' , to: 'sites#index'
  get '/top' , to: 'sites#index'
  get '/login' , to: 'sites#index'
  get '/signup' , to: 'sites#index'
  get '/users' , to: 'sites#index'
  get '/problems' , to: 'sites#index'
  get '/users/:id' , to: 'sites#index'
  get '/users/:id/followers' , to: 'sites#index'
  get '/users/:id/followings' , to: 'sites#index'
  get '/users/:id/edit' , to: 'sites#index'
  get '/users/:id/solutions', to: 'sites#index'
  get '/users/like_problems' , to: 'sites#index'
  get '/users/like_solutions' , to: 'sites#index'
  get '/problems/new' , to: 'sites#index'
  get '/problems/:id/solutions/new' , to: 'sites#index'
  get '/problems/:id/solutions/' , to: 'sites#index'
  get '/problems/:id' , to: 'sites#index'
  get '/solutions/:id' , to: 'sites#index'
  get '/problems/:id/edit' , to: 'sites#index'
  get '/solutions/:id/edit' , to: 'sites#index'
  get '/problems/:id/comments/new' , to: 'sites#index'
  get '/solutions/:id/comments/new' , to: 'sites#index'
  get '/comments/:id' , to: 'sites#index'
  get '/comments/:id/edit' , to: 'sites#index'
  get '/search' , to: 'sites#index'
  get '/searchprocess' , to: 'sites#index'
  get '/katex', to: 'sites#index'
end
