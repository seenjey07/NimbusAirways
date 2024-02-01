class FlightsController < ApplicationController
  def index
    flights = Flight.all
    render json: { flights: flights }
  end

  def flight_search
    origin_location = params[:origin_location]
    destination_location = params[:destination_location]
    departure_date = params[:departure_date]

    if origin_location.blank? || destination_location.blank? || departure_date.blank?
      render json: { error: "Please provide valid values for the following fields." }, status: :unprocessable_entity 
      return
    end
    
    flights = Flight.joins(:route)
                    .where(routes: { origin_location: origin_location, destination_location: destination_location })
                    .where(departure_date: departure_date)
    routes = Route.where(origin_location: origin_location, destination_location: destination_location)

    render json: { flights: flights, routes: routes }
  end

end
