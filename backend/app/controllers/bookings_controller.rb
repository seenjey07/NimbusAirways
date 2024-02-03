class BookingsController < ApplicationController
  # before_action :authenticate_user!
  before_action :set_booking, only: [:show, :update, :destroy]

  def index
    @bookings = current_user.bookings

    if @bookings.empty?
      render json: { notice: 'You have no bookings.' }, status: :ok
    else
      render json: formatted_bookings(@bookings)
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

  def create_booking
    ActiveRecord::Base.transaction do
      @booking = current_user.bookings.build(booking_params)

      if @booking.save
        create_passengers
        update_booking_after_save
        render json: @booking, status: :created
      else
        render json: { errors: @booking.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  def create_passengers
    passengers_params = params[:passengers]
    return if passengers_params.blank?

    passengers_params.each do |passenger_params|
      passenger = @booking.passengers.build(passenger_params.permit(:first_name, :middle_name, :last_name, :birth_date, :gender, :is_discounted, :baggage_quantity))
      if passenger.save
        puts "Passenger saved successfully: #{passenger.inspect}"
      else
        puts "Error saving passenger: #{passenger.errors.full_messages.join(', ')}"
      end
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


  def set_booking
    @booking = current_user.bookings.find_by(params[:booking_reference])
  end

  def booking_params
    params.require(:booking).permit(:flight_id, :total_passengers, passengers: [:first_name, :middle_name, :last_name, :birth_date, :gender, :is_discounted, :baggage_quantity])
  end

  def update_booking_after_save
    @booking.flight.update(available_seats: @booking.flight.available_seats - @booking.total_passengers)
    @booking.confirmation_date = Date.today
    @booking.save
  end
  def formatted_bookings(bookings)
    bookings.map do |booking|
      {
        id: booking.id,
        user_id: booking.user_id,
        booking_reference: booking.booking_reference,
        is_confirmed: booking.is_confirmed,
        confirmation_date: booking.confirmation_date,
        flight_id: booking.flight_id,
        created_at: booking.created_at,
        updated_at: booking.updated_at,
        origin_location: booking.flight.route.origin_location,
        destination_location: booking.flight.route.destination_location,
        departure_date: booking.flight.departure_date
      }
    end
  end


end
