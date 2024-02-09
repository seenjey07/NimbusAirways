class AdminsFlightController < ApplicationController
  before_action :authenticate_user!
  before_action :require_admin

  def index
    @flights = Flight.includes(:route, :aircraft).all
    render json: @flights, include: [:route, :aircraft]
  end

  def create
    flight_params = params.permit(:route_id, :departure_date, :arrival_date, :aircraft_id, :gate, :terminal)

    route = Route.find_by(id: flight_params[:route_id])
    aircraft = Aircraft.find_by(id: flight_params[:aircraft_id])

    unless route && aircraft
      render_error('Invalid route or aircraft', :unprocessable_entity)
      return
    end

    @flight = Flight.new(flight_params.merge(route: route, aircraft: aircraft))

    @flight.flight_number = generate_flight_number(aircraft.id, route.id)

    @flight.available_seats = aircraft.seat_capacity
    @flight.total_seats = aircraft.seat_capacity
    @flight.is_active = true
    @flight.is_available = true

    if @flight.save
      render json: { success: true, flight: @flight }, status: :created
    else
      render_error('Failed to create flight', :unprocessable_entity)
    end
  end


  private

  def generate_flight_number(aircraft_id, route_id)
    now = Time.current
    month = now.strftime('%m')
    day = now.strftime('%d')
    hour = now.strftime('%H')

    "NA#{aircraft_id}#{route_id}#{month}#{day}#{hour}"
  end

  def require_admin
    unless current_user && (current_user.role.downcase == 'admin' || current_user.role.downcase == 'superadmin')
      render json: { error: 'You are not authorized to access this page.' }, status: :unauthorized
    end
  end
end
