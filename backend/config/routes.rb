Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup',
    password: 'password'
  },
  controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks',
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    confirmations: 'users/confirmations',
    passwords: 'users/passwords'
  }
########################### USER ROUTES #########################################
    # post 'password/forgot', to: 'users/passwords#forgot'

  devise_scope :user do
    post 'password/reset', to: 'users/passwords#reset'
  end

    get 'api/routes', to: 'routes#index'

    get 'api/flights', to: 'flights#index'
    get 'api/flights/:id', to: 'flights#show'
    get 'api/indexedflights', to: 'flights#indexed_flights'
    post 'api/flights', to: 'flights#flight_search'

    get 'api/users', to: 'users#index'
    get 'api/authorization', to: 'users#check_authorization'
    get 'api/users/:id', to: 'users#show'
    put 'api/users/:id', to: 'users#update'

    get 'api/bookings', to: 'bookings#index'
    get 'api/bookings/:id', to: 'bookings#show'
    post 'api/book', to: 'bookings#create_booking'
    put 'api/bookings/:id', to: 'bookings#update'
    delete 'api/bookings/:id', to: 'bookings#destroy'

    get '/flights/:flight_id/seats', to: 'flights#index_seats'

########################### END OF USER ROUTES #################################

###########################  ADMIN ROUTES ######################################
  get '/admin/users', to: 'admins_user#index'
  get '/admin/users/:id', to: 'admins_user#show'
  delete '/admin/users/:id', to: 'admins_user#destroy'
  post '/admin/users', to: 'admins_user#create'
  post '/admin/users/:id/confirm', to: 'admins_user#confirm_email'
  put '/admin/users/:id', to: 'admins_user#update'
  get '/admin', to: 'admins#check_authorization'


  get '/admin/flights', to: 'admins_flight#index'
  post '/admin/flights', to: 'admins_flight#create'
  post '/admin/genflights', to: 'admins_flight#generate_flights'

  get '/admin/seats', to: 'admins#index_seats'

  get '/admin/meals', to: 'admins_meal#index_meals'
  post '/admin/meals', to: 'admins_meal#create_meals'
  delete '/admin/meals/:id', to: 'admins_meal#destroy_meal'

  get '/admin/routes', to: 'admins_route#index'
  post '/admin/routes', to: 'admins_route#create'

  get '/admin/bookings', to: 'admins#index_bookings'
  get '/admin/bookings/:id', to: 'admins_booking#index'

  get '/admin/aircrafts', to: 'admins_aircraft#index'
  get '/admin/aircrafts/:id/flights', to: 'admins_aircraft#index_flights_by_aircraft'
  post '/admin/aircrafts', to: 'admins_aircraft#create'

  delete '/admin/aircrafts/:id', to: 'admins_aircraft#destroy'

  get '/admin/passengers', to: 'admins#index_passengers'

  get '/admin/stats', to: 'admins_stat#index'
  get "up" => "rails/health#show", as: :rails_health_check

################################ END OF ADMIN ROUTES ################################
end
