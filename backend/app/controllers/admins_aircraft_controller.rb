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
    now = Time.current

    current_flight = flights.find do |flight|
      departure_date = flight["departure_date"]
      arrival_date = flight["arrival_date"]

      if departure_date.present? && arrival_date.present?
        departure_date <= now && now <= arrival_date
      else
        false
      end
    end

    if current_flight.nil?
      return "inactive"
    end

    if current_flight["departure_date"] <= now && now <= current_flight["arrival_date"]
      return "on air"
    end

    arrival_date_with_buffer = current_flight["arrival_date"] + 20.minutes
    if now <= arrival_date_with_buffer
      return "idle"
    end

    landing_window_start = current_flight["arrival_date"] - 10.minutes
    if now >= landing_window_start
      return "landing"
    end

    return "inactive"
  end

  def aircraft_params
    params.require(:aircraft).permit(:model, :family, :seat_capacity)
  end



end
