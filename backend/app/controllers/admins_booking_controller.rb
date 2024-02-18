class AdminsBookingController < ApplicationController
  before_action :authenticate_user!
  before_action :require_admin
  def index
    @booking = Booking.find(params[:id])
    @passengers = @booking.passengers.includes(:seat)
    @flight = @booking.flight
    @route = Route.find(@flight.route_id) if @flight && @flight.route_id.present?

    render json: {
      booking: @booking.as_json(include: { flight: { include: :aircraft } }),
      passengers: @passengers.as_json(include: :flight, include: { seat: {} }),
      route: @route&.as_json
    }
  end

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
