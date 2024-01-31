class AdminsController < ApplicationController
  # before_action :authenticate_user!
  # before_action :require_admin

  ## USERS ##
  def index_users
    @users = User.all
    render json: @users
  end


  ## END OF USERS ##


  private

  def require_admin
    unless current_user && current_user.role == 'admin'
      redirect_to root_path, alert: 'You are not authorized to access this page.'
    end
  end
end
