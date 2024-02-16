# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController


  def reset

  end


  # GET /resource/password/new
  # def new
  #   super
  # end

  # POST /resource/password
  def create
    if params[:email].blank?
      render json: { error: 'Email not present' }, status: :unprocessable_entity
      return
    end

    user = User.find_by(email: params[:email])

    if user.present?
      user.generate_password_token!
      user.save(validate: false)
      user.send_reset_password_instructions

      render json: { status: 'ok' }, status: :ok
    else
      render json: { error: ['Email address not found. Please check and try again.'] }, status: :not_found
    end
  end

  # GET /resource/password/edit?reset_password_token=abcdef
  # def edit
  #   super
  # end

  # PUT /resource/password
  def reset
    token = params[:token].to_s

    if token.blank?
      return render json: { error: 'Token not present' }, status: :unprocessable_entity
    end

    user = User.find_by(reset_password_token: token)

    if user.present? && user.password_token_valid?
      if user.reset_password!(params[:password])
        render json: { status: 'ok', email: user.email }, status: :ok
      else
        render json: { error: user.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: ['Link not valid or expired. Try generating a new link.'] }, status: :not_found
    end
  end






  # protected

  # def after_resetting_password_path_for(resource)
  #   super(resource)
  # end

  # The path used after sending reset password instructions
  def after_sending_reset_password_instructions_path_for(resource_name)
    'http://localhost:5173/login'
  end
end
