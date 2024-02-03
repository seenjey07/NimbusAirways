class AdminsController < ApplicationController
  # before_action :authenticate_user!
  # before_action :require_admin

  ## USERS ##
  def index_users
    @users = User.all
    render json: @users
  end
  ## END OF USERS ##

  ## FLIGHTS ##
    def index_flights
      @flights = Flight.includes(:route, :aircraft).all
      render json: @flights, include: [:route, :aircraft]
    end
  ## END OF FLIGHTS ##

  ## SEATS ##
    def index_seats
      @seats = Seat.all
      render json: @seats
    end
  ## END OF SEATS ##


  private

  def require_admin
    unless current_user && current_user.role == 'admin' || 'superadmin'
      redirect_to root_path, alert: 'You are not authorized to access this page.'
    end
  end
end
