# frozen_string_literal: true

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  # You should configure your model like this:
  # devise :omniauthable, omniauth_providers: [:twitter]

  # You should also create an action method in this controller like this:
  # def twitter
  # end

  # More info at:
  # https://github.com/heartcombo/devise#omniauth

  # GET|POST /resource/auth/twitter
  # def passthru
  #   super
  # end

  # GET|POST /users/auth/twitter/callback
  # def failure
  #   super
  # end

  # protected

  # The path used when OmniAuth fails
  # def after_omniauth_failure_path_for(scope)
  #   super(scope)
  # end
  def google_oauth2

     @user = User.signin_or_create_from_provider(params)
     if @user.persisted?
       sign_in(@user)
       login_token = @user.create_new_auth_token
       render json: {
         status: 'SUCCESS',
         message: "user was successfully logged in through #{params[:provider]}",
         headers: login_token
       },
              status: :created
     else
       render json: {
         status: 'FAILURE',
         message: "There was a problem signing you in through #{params[:provider]}",
         data: @user.errors
       },
              status: :unprocessable_entity
     end
  end
  def github
    @user = User.from_omniauth(request.env['omniauth.auth'])

    if @user.persisted?
      render json: { user: @user, message: 'Successfully authenticated with GitHub' }
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
