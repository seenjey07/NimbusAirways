class AdminsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_admin

  def check_authorization
    render json: { message: 'Authorized' }
  end




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
    if current_user.nil?
      render json: { error: 'You must be logged in to access this page.' }, status: :unauthorized
    elsif current_user.role.downcase.in?(['admin', 'superadmin'])
    else
      render json: { error: 'You are not authorized to access this page.' }, status: :unauthorized
    end
  end


end
