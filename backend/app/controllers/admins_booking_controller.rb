class AdminsBookingController < ApplicationController
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
end
