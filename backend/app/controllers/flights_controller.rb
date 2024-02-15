class FlightsController < ApplicationController

  def index
    flights = Flight.all
    render json: { flights: flights.collect { |flight| render_json(flight) } }
  end

  def show
    flight_id = params[:id]
    flight = Flight.find_by(id: flight_id)

    if flight
      render json: render_json_with_aircraft(flight)
    else
      render json: { error: "Flight not found" }, status: :not_found
    end
  end

  def index_seats
    flight = Flight.find(params[:flight_id])

    if flight
      seats = Seat.where(flight_id: flight.id)
      render json: { seats: seats.collect { |seat| render_seat_json(seat) } }
    else
      render json: { error: "Flight not found" }, status: :not_found
    end
  end

  def indexed_flights
    today = Date.today
    start_date = today + 7
    end_date = today + 14

    @routes = Route.all
    @flights = []

    @routes.each do |route|
      flight = route.flights.where(departure_date: start_date..end_date).order('RANDOM()').limit(1).first
      @flights << { routes: route, flights: flight } if flight
    end

    render json: @flights
  end


  def flight_search
    origin_location = params[:origin_location]
    destination_location = params[:destination_location]
    departure_date = params[:departure_date]

    if origin_location.blank? || destination_location.blank? || departure_date.blank?
      render json: { error: "Please provide valid values for the following fields." }, status: :unprocessable_entity
      return
    end

    search_date = DateTime.parse(departure_date).to_date

    flights = Flight.joins(:route).where(routes: { origin_location: origin_location, destination_location: destination_location })
                      .where('DATE(departure_date) = ?', search_date)

    render json: { flights: flights.collect { |flight| render_json(flight) } }
  end

  private

  def render_json(flight)
    {
      flight_id: flight.id,
      flight_number: flight.flight_number,
      departure_date: flight.departure_date,
      arrival_date: flight.arrival_date,
      origin_location: flight.route.origin_location,
      destination_location: flight.route.destination_location,
      price: flight.route.price
    }
  end

  def render_json_with_aircraft(flight)
    {
      flight_id: flight.id,
      flight_number: flight.flight_number,
      departure_date: flight.departure_date,
      arrival_date: flight.arrival_date,
      origin_location: flight.route.origin_location,
      destination_location: flight.route.destination_location,
      price: flight.route.price,
      aircraft: {
        name: flight.aircraft.family,
        model: flight.aircraft.model,
      }
    }
  end

  def render_seat_json(seat)
    {
      seat_number: seat.seat_number,
      seat_letter: seat.seat_letter,
      is_available: seat.is_available
    }
  end
end
