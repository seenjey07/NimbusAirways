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


  resources :bookings, only: [:create, :show, :update, :destroy]
  get '/api/flights', to: 'flights#search'

  get "up" => "rails/health#show", as: :rails_health_check
end
