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


  def generate_flights
    generate_flights_internal(params)
    render json: { success: true, message: 'Flights generated successfully' }
  end






  private
  def generate_flights_internal(params)
    start_month = params[:start_month].to_i
    end_month = params[:end_month].to_i
    start_day = params[:start_day].to_i
    end_day = params[:end_day].to_i
    start_hour = params[:start_hour].to_i
    end_hour = params[:end_hour].to_i
    aircraft_id = params[:aircraft_id].to_i
    route_id = params[:route_id].to_i
    return_route_id = params[:return_route_id].to_i
    gate = params[:gate]
    terminal = params[:terminal]
    duration = params[:duration].to_i
    adjustment_time = params[:adjustment_time].to_i

    aircraft = Aircraft.find(aircraft_id)
    seat_capacity = aircraft.seat_capacity

    flights_data = []

    origin_interval = (duration * 2) + adjustment_time
    current_time = DateTime.new(2024, start_month, start_day, start_hour, 0, 0)

    (start_month..end_month).each do |month|
      days_in_month = Time.days_in_month(month, 2024)

      (start_day..end_day).each do |day|
        (start_hour..end_hour).each do |hour|
          origin_departure_time = current_time
          origin_arrival_time = origin_departure_time + duration.minutes + adjustment_time.minutes

          origin_flight_data = {
            flight_number: "NA#{aircraft_id}#{route_id}#{month}#{day}#{hour}",
            route_id: route_id,
            departure_date: origin_departure_time,
            arrival_date: origin_arrival_time,
            available_seats: seat_capacity,
            total_seats: seat_capacity,
            aircraft_id: aircraft_id,
            is_active: true,
            gate: gate,
            terminal: terminal,
            is_available: true
          }

          origin_flight = Flight.create(origin_flight_data)
          flights_data << origin_flight_data

          current_time = origin_arrival_time + origin_interval.minutes + (adjustment_time.minutes * 3)
        end
      end
    end

    return_start_time = DateTime.new(2024, start_month, start_day, start_hour, 0, 0) + duration.minutes + adjustment_time.minutes * 2
    return_interval = (duration * 2) + adjustment_time

    (start_month..end_month).each do |month|
      days_in_month = Time.days_in_month(month, 2024)

      (start_day..end_day).each do |day|
        (start_hour..end_hour).each do |hour|
          return_departure_time = return_start_time
          return_arrival_time = return_departure_time + duration.minutes + adjustment_time.minutes

          return_flight_data = {
            flight_number: "NA#{aircraft_id}#{return_route_id}#{month}#{day}#{hour + 1}",
            route_id: return_route_id,
            departure_date: return_departure_time,
            arrival_date: return_arrival_time,
            available_seats: seat_capacity,
            total_seats: seat_capacity,
            aircraft_id: aircraft_id,
            is_active: true,
            gate: gate,
            terminal: terminal,
            is_available: true
          }

          return_flight = Flight.create(return_flight_data)
          flights_data << return_flight_data

          return_start_time = return_arrival_time + return_interval.minutes + (adjustment_time.minutes * 3)
        end
      end
    end

    flights_data
  end

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
