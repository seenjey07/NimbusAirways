class AdminsRouteController < ApplicationController
  def index
    @routes = Route.all
    render json: @routes
  end
  def create
    route_params = params.permit(:origin_location, :origin_code, :origin_name, :destination_location, :destination_code, :destination_name, :price, :is_available)

    if route_params[:origin_code] == route_params[:destination_code]
      render json: { error: 'Origin and destination cannot be the same' }, status: :unprocessable_entity
      return
    end

    existing_route = Route.find_by(origin_code: route_params[:origin_code], destination_code: route_params[:destination_code])

    if existing_route
      render json: { error: 'Route with the same origin and destination codes already exists' }, status: :unprocessable_entity
      return
    end

    initial_route = Route.create_route(route_params)

    if initial_route.persisted?
      return_route_params = {
        origin_location: route_params[:destination_location],
        origin_code: route_params[:destination_code],
        origin_name: route_params[:destination_name],
        destination_location: route_params[:origin_location],
        destination_code: route_params[:origin_code],
        destination_name: route_params[:origin_name],
        price: route_params[:price],
        is_available: route_params[:is_available]
      }

      return_route = Route.create_route(return_route_params)

      if return_route.persisted?
        render json: { message: 'Route and return route successfully created' }, status: :created
      else
        initial_route.destroy
        render json: { error: 'Failed to create return route' }, status: :unprocessable_entity
      end
    else
      render json: { error: 'Failed to create route' }, status: :unprocessable_entity
    end
  end
end
