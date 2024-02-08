class AdminsUserController < ApplicationController
  before_action :authenticate_user!
  before_action :require_admin
  before_action :set_user, only: [:show, :update, :destroy]

  def index
    @users = User.all
    render json: @users
  end

  def show
    render json: @user
  end

  def create
    existing_user = User.find_by(email: user_params[:email])

  if existing_user
    render json: { errors: ['User already exists with this email.'] }, status: :unprocessable_entity
  else
    @user = User.new(user_params)

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

  private

  def set_user
    @user = User.find(params[:id])
  end

  def update_user_params
    params.require(:user).permit(:first_name, :middle_name, :last_name, :phone_number, :birth_date, :gender, :email)
  end

  def require_admin
    unless current_user && (current_user.role == 'admin' || current_user.role == 'superadmin')
      render json: { error: 'You are not authorized to access this page.' }, status: :unauthorized
    end
  end
end
