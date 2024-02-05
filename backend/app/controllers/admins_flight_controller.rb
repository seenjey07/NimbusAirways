class AdminsFlightController < ApplicationController
  # before_action :authenticate_user!
  # before_action :require_admin

  def index
    @flights = Flight.includes(:route, :aircraft).all
    render json: @flights, include: [:route, :aircraft]
  end

  def create
    flight_params = params.permit(:route_id, :departure_date, :arrival_date, :aircraft_id, :gate, :terminal)

    route = Route.find_by(id: flight_params[:route_id])
    aircraft = Aircraft.find_by(id: flight_params[:aircraft_id])

    unless route && aircraft
      render json: { error: 'Invalid route or aircraft' }, status: :unprocessable_entity
      return
    end


    if Flight.exists?(aircraft_id: aircraft.id, departure_date: flight_params[:departure_date]..flight_params[:arrival_date])
      render json: { error: 'Flight schedule is already existing for the given aircraft on the provided dates' }, status: :unprocessable_entity
      return
    end


    departure_datetime = DateTime.strptime(flight_params[:departure_date], '%m/%d/%YT%H:%M')
    arrival_datetime = DateTime.strptime(flight_params[:arrival_date], '%m/%d/%YT%H:%M')

    flight_params[:available_seats] = aircraft.seat_capacity
    flight_params[:total_seats] = aircraft.seat_capacity
    flight_params[:is_active] = true
    flight_params[:is_available] = true


    day_of_month = departure_datetime.day
    hour_of_departure = departure_datetime.strftime('%H')

    flight_params[:departure_date] = departure_datetime.strftime('%Y-%m-%d %H:%M:%S')
    flight_params[:arrival_date] = arrival_datetime.strftime('%Y-%m-%d %H:%M:%S')

    flight_params[:flight_number] = "NA#{day_of_month}#{hour_of_departure}"

    @return_flight = nil
    @flight = Flight.new(flight_params)

    if @flight.valid?
      if @flight.departure_date.present? && @flight.arrival_date.present? && @flight.departure_date < @flight.arrival_date
        duration = (@flight.arrival_date - @flight.departure_date).to_i.minutes

        reverse_route = Route.find_by(
          origin_code: route.destination_code,
          destination_code: route.origin_code
        )

        unless reverse_route
          @flight.errors.add(:base, 'Reverse route not found')
          render json: { error: @flight.errors.full_messages }, status: :unprocessable_entity
          return
        end

        if duration >= 0
          return_flight_params = {
            route_id: reverse_route.id,
            departure_date: departure_datetime + 20.minutes,
            arrival_date: departure_datetime + 20.minutes + duration,
            aircraft_id: aircraft.id,
            gate: @flight.gate,
            terminal: @flight.terminal
          }

          return_flight_params[:departure_date] = return_flight_params[:departure_date].strftime('%Y-%m-%d %H:%M:%S')
          return_flight_params[:arrival_date] = return_flight_params[:arrival_date].strftime('%Y-%m-%d %H:%M:%S')

          return_flight_params[:available_seats] = aircraft.seat_capacity
          return_flight_params[:total_seats] = aircraft.seat_capacity
          return_flight_params[:is_active] = true
          return_flight_params[:is_available] = true


          return_departure_datetime = DateTime.parse(return_flight_params[:departure_date])
          return_arrival_datetime = DateTime.parse(return_flight_params[:arrival_date])

          day_of_month_return = return_departure_datetime.day
          hour_of_departure_return = return_departure_datetime.strftime('%H')

          return_flight_params[:flight_number] = "NA#{day_of_month_return}#{hour_of_departure_return}"


          @return_flight = Flight.new(return_flight_params)

          if @return_flight.save
            render json: { flight: @flight.reload, return_flight: @return_flight.reload }, status: :created
          else
            @flight.errors.add(:base, 'Failed to create return flight')
            render json: { error: @flight.errors.full_messages }, status: :unprocessable_entity
          end
        else
          @flight.errors.add(:base, 'Invalid duration. Arrival date should be after departure date.')
          render json: { error: @flight.errors.full_messages }, status: :unprocessable_entity
        end
      else
        @flight.errors.add(:base, 'Invalid departure or arrival date. Make sure they are present and in the correct order.')
        render json: { error: @flight.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: @flight.errors.full_messages }, status: :unprocessable_entity
    end
  end




  private

  def require_admin
    unless current_user && (current_user.role == 'admin' || current_user.role == 'superadmin')
      redirect_to root_path, alert: 'You are not authorized to access this page.'
    end
  end
end
