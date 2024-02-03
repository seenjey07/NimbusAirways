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

  ## BOOKINGS ##
  def index_bookings
    @bookings = Booking.all
    render json: @bookings
  end
  ## END OF BOOKINGS ##

  ## PASSENGERS ##
  def index_passengers
    @passengers = Passenger.all
    render json: @passengers
  end
 ## END OF PASSENGERS ##


  private

  def require_admin
    unless current_user && current_user.role == 'admin' || 'superadmin'
      redirect_to root_path, alert: 'You are not authorized to access this page.'
    end
  end
end
