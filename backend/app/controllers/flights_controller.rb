class FlightsController < ApplicationController
  
  def index
    flights = Flight.all
    render json: { flights: flights }
  end

  def flight_search
    origin_location = params[:origin_location]
    destination_location = params[:destination_location]
    departure_date = params[:search_date]

    if origin_location.blank? || destination_location.blank? || departure_date.blank?
      render json: { error: "Please provide valid values for the following fields." }, status: :unprocessable_entity
      return
    end

    search_date = DateTime.parse(departure_date).to_date

    flights = Flight.joins(:route).where(routes: { origin_location: origin_location, destination_location: destination_location })
                      .where('DATE(departure_date) = ?', search_date)

    render json: { flights: flights }
  end

end