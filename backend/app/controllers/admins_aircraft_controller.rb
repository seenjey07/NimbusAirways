class AdminsAircraftController < ApplicationController
  # before_action :authenticate_user!
  # before_action :require_admin

  def index
    @aircrafts = Aircraft.all.map do |aircraft|
      flights = Flight.where(aircraft_id: aircraft.id, is_active: true)
      current_route = aircraft.current_route
      aircraft.as_json.merge(
        status: get_aircraft_status(aircraft, flights, current_route),
        current_route: current_route.as_json
      )
    end
    render json: @aircrafts
  end

  def create
    @aircraft = Aircraft.new(aircraft_params)

    if @aircraft.save
      render json: @aircraft, status: :created
    else
      render json: { error: @aircraft.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index_flights_by_aircraft
    aircraft_id = params[:id]
    aircraft = Aircraft.find_by(id: aircraft_id)

    if aircraft
      current_flights = current_flights(aircraft)
      all_flights = all_flights(aircraft)
      current_route = aircraft.current_route

      render json: {
        aircraft: aircraft.as_json,
        status: get_aircraft_status(aircraft, current_flights, current_route),
        current_route: current_route.as_json,
        current_flights: current_flights.as_json,
        all_flights: all_flights.as_json
      }
    else
      render json: { error: "Aircraft not found." }, status: :not_found
    end
  end

  def destroy
    aircraft = Aircraft.find_by(id: params[:id])

    if aircraft
      aircraft.destroy
      render json: { message: "Aircraft successfully deleted." }
    else
      render json: { error: "Aircraft not found." }, status: :not_found
    end
  end

  private
  def require_admin
    unless current_user && (current_user.role.downcase == 'admin' || current_user.role.downcase == 'superadmin')
      render json: { error: 'You are not authorized to access this page.' }, status: :unauthorized
    end
  end

  def get_aircraft_status(aircraft, flights, current_route)
    now = Time.current.in_time_zone('Asia/Manila')

    current_flight = flights.find do |flight|
      departure_date = flight["departure_date"].in_time_zone('Asia/Manila')
      arrival_date = flight["arrival_date"].in_time_zone('Asia/Manila')

      if departure_date.present? && arrival_date.present?
        departure_date <= now && now <= arrival_date
      else
        false
      end
    end

    return "inactive" if current_flight.nil?
    return "on air" if now >= current_flight["departure_date"] - 10.minutes && now <= current_flight["arrival_date"] - 10.minutes
    return "taking off" if now >= current_flight["departure_date"] && now <= current_flight["departure_date"] + 10.minutes
    return "landing" if now >= current_flight["arrival_date"] - 10.minutes && now <= current_flight["arrival_date"]

    next_flight = flights.select { |flight| flight["departure_date"] > current_flight["arrival_date"] }
                        .min_by { |flight| flight["departure_date"] }

    puts "Current Flight Arrival: #{current_flight["arrival_date"]}" if current_flight
    puts "Next Flight Departure: #{next_flight["departure_date"]}" if next_flight

    return "boarding" if next_flight && now <= next_flight["departure_date"] - 10.minutes
    return "idle" if current_flight && next_flight && now >= current_flight["arrival_date"] + 11.minutes && now <= next_flight["departure_date"] - 2.hours

    "inactive"
  end


  def aircraft_params
    params.require(:aircraft).permit(:model, :family, :seat_capacity)
  end

  def current_flights(aircraft)
    now = Time.current.in_time_zone('Asia/Manila')

    flights = Flight.where(aircraft_id: aircraft.id)

    current_flights = flights.select do |flight|
      departure_date = flight.departure_date.in_time_zone('Asia/Manila')
      arrival_date = flight.arrival_date.in_time_zone('Asia/Manila')

      departure_date.present? && arrival_date.present? &&
        departure_date <= now && now <= arrival_date
    end

    current_flights
  end

  def all_flights(aircraft)
    flights = Flight.where(aircraft_id: aircraft.id)
    flights
  end

end
