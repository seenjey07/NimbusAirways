class AdminsStatController < ApplicationController
  before_action :authenticate_user!
  before_action :require_admin
  def index
    @flights_count = Flight.count
    @users_count = User.count
    @routes_count = Route.count
    @revenue = calculate_total_revenue
    @bookings_count = Booking.count
    @aircraft_count = Aircraft.count
    @first_10_users = User.order(created_at: :desc).limit(10)

    render json: {
      flights_count: @flights_count,
      users_count: @users_count,
      routes_count: @routes_count,
      revenue: @revenue,
      bookings_count: @bookings_count,
      aircrafts_count: @aircraft_count,
      first_10_users: @first_10_users
    }
  end

  private

  def calculate_total_revenue
    total_revenue = Booking.joins(:flight, flight: :route)
                           .where("bookings.is_confirmed": true)
                           .sum("routes.price * bookings.total_passengers")
    total_revenue
  end

  def require_admin
    unless current_user && (current_user.role == 'admin' || current_user.role == 'superadmin')
      render json: { error: 'You are not authorized to access this page.' }, status: :unauthorized
    end
  end
end
