class UsersController < ApplicationController
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
