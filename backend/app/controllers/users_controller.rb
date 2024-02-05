class UsersController < ApplicationController
  def show
    user = current_user
    user_details = {
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      birth_date: user.birth_date,
      phone_number: user.phone_number,
      gender: user.gender
    }
    render json: user_details
  end
end
