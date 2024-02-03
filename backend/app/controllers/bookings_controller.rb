class BookingsController < ApplicationController
  before_action :require_login
  before_action :set_booking, only: [:show, :update, :destroy]

  def index
    @bookings = current_user.bookings

    if @bookings.empty?
      render json: { notice: 'You have no bookings.' }, status: :ok
    else
      render json: @bookings
    end
  end

  def create
    @booking = current_user.bookings.build(booking_params)

    if @booking.save
      update_booking_after_save
      render json: @booking, status: :created
    else
      render json: { errors: @booking.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    @booking = current_user.bookings.find_by(params[:booking_reference])
    render json: @booking
  end

  def update
    if @booking.update(booking_params)
      update_booking_after_save
      render json: @booking
    else
      render json: { errors: @booking.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @booking = current_user.bookings.find_by(params[:booking_reference])
    @booking.destroy
    head :no_content
  end

  private

  def require_login
    unless current_user
      render json: { error: 'You must be logged in to access this page.' }, status: :unauthorized
    end
  end

  def set_booking
    @booking = current_user.bookings.find_by(params[:booking_reference])
  end

  def booking_params
    params.require(:booking).permit(:flight_id, :confirmation_date, :booking_reference)
  end

  def update_booking_after_save
    @booking.flight.update(available_seats: @booking.flight.available_seats - 1)
    @booking.confirmation_date = Date.today
    @booking.save
  end
end
