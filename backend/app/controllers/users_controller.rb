class UsersController < ApplicationController
  before_action :authenticate_user!, only: [:show, :update, :check_authorization]


  def check_authorization
    if current_user.nil? || !current_user.confirmed?
      render json: { message: 'Unauthorized' }, status: :unauthorized
    else
      response_data = {
        message: 'Authorized',
        confirmed_at: current_user.confirmed_at
      }
      render json: response_data
    end
  end



  def index
    @users = User.all
    render json: @users
  end

  def create
    @user = User.new(user_params)
  end

  def show
    user = current_user
    user_details = {
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      birth_date: user.birth_date,
      phone_number: user.phone_number,
      gender: user.gender,
      travel_fund: user.travel_fund,
      email: user.email,
    }
    render json: user_details
  end

  def update
    user = current_user

    if user.update(user_params)
      render json: { message: 'Information updated successfully.' }
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :middle_name, :last_name, :birth_date, :phone_number, :gender, :email, :password, :new_password)
  end
end
