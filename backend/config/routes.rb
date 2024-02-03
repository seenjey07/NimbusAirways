Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

    get 'api/routes', to: 'routes#index'
    get 'api/flights', to: 'flights#index'
    post 'api/flights', to: 'flights#flight_search'

    resources :bookings, only: [:index, :show, :create, :update, :destroy], path: 'api/bookings'

  ## ADMIN ROUTES ##
  get '/admin/users', to: 'admins#index_users'

  get '/admin/flights', to: 'admins_flight#index'
  post '/admin/flights', to: 'admins_flight#create'

  get '/admin/seats', to: 'admins#index_seats'


  get '/admin/routes', to: 'admins_route#index_routes'
  post '/admin/routes', to: 'admins_route#create_route'

  get "up" => "rails/health#show", as: :rails_health_check
end
