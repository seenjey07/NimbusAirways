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

  get '/api/routes', to: 'routes#index'

  get '/api/flights', to: 'flights#index'
  post '/api/flights', to: 'flights#flight_search'

  resources :bookings

  ## ADMIN ROUTES ##
  get '/admin/users', to: 'admins#index_users'

  get "up" => "rails/health#show", as: :rails_health_check
end
