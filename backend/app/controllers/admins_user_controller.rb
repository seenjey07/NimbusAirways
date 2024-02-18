class AdminsUserController < ApplicationController
  before_action :authenticate_user!
  before_action :require_admin
  before_action :set_user, only: [:show, :update, :destroy, :confirm_email]

  def index
    @users = User.all
    render json: @users
  end

  def show
    render json: @user.as_json.merge(confirmed_at: @user.confirmed_at)
  end

  def create
    existing_user = User.find_by(email: user_params[:email])

  if existing_user
    render json: { errors: ['User already exists with this email.'] }, status: :unprocessable_entity
  else
    @user = User.new(user_params)
    @user.confirmed_at = Time.now

    if @user.save
      render json: @user, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end
end

  def update
    if @user.update(update_user_params)
      render json: @user
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end


  def destroy
    @user.destroy
    render json: { message: 'User was successfully deleted.' }
  end

  def confirm_email
    if @user.update(confirmed_at: Time.now)
      render json: @user, status: :ok
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end



  private

  def set_user
    @user = User.find(params[:id])
  end

  def update_user_params
    params.require(:user).permit(:first_name, :middle_name, :last_name, :phone_number, :birth_date, :gender, :email, :role)
  end

  def user_params
    params.require(:user).permit(:first_name, :middle_name, :last_name, :birth_date, :phone_number, :gender, :email, :password, :new_password)
  end

  def require_admin
    unless current_user && (current_user.role.downcase == 'admin' || current_user.role.downcase == 'superadmin')
      render json: { error: 'You are not authorized to access this page.' }, status: :unauthorized
    end
  end
end
