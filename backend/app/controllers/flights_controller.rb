class FlightsController < ApplicationController
  def search
    origin = params[:departure]
    destination = params[:destination]
    date = params[:date]

    flights = Flight.where(departure: departure, destination: destination, date: date)

    render json: { flights: flights }
  end
end
