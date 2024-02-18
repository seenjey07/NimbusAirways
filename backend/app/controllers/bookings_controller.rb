class BookingsController < ApplicationController
  before_action :authenticate_user!
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
      @booking.booking_reference = generate_random_booking_reference

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

    seats_params = params[:seats] || []

    passengers_params.each_with_index do |passenger_params, index|
      passenger = @booking.passengers.build(passenger_params.permit(:first_name, :middle_name, :last_name, :birth_date, :gender, :is_discounted, :baggage_quantity))

      seat_params = seats_params[index] || {}
      seat = Seat.new(seat_params.permit(:seat_number, :seat_letter, :is_available))

      seat.flight = @booking.flight if @booking.flight.present?
      seat.aircraft = @booking.flight.aircraft if @booking.flight&.aircraft.present?

      if seat.save
        passenger.update(seat: seat)
        puts "Passenger and seat saved successfully: #{passenger.inspect}, #{seat.inspect}"
      else
        puts "Error saving passenger: #{passenger.errors.full_messages.join(', ')}"
      end
    end
  end


  def generate_random_booking_reference
    random_number = rand(10_000..99_999)
    random_letters1 = ('A'..'Z').to_a.sample(3).join
    random_letters2 = ('A'..'Z').to_a.sample(2).join

    "NA#{random_number}#{random_letters1}#{random_number}#{random_letters2}"
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
    @booking = current_user.bookings.find_by(booking_reference: params[:booking_reference])

    unless @booking
      render json: { error: 'Booking not found' }, status: :not_found
    end
  end



  def booking_params
    params.require(:booking).permit(
      :flight_id,
      :total_passengers,
      passengers: [:first_name, :middle_name, :last_name, :birth_date, :gender, :is_discounted, :baggage_quantity],
      seats: [:seat_number, :seat_letter, :is_available])
  end

  def update_booking_after_save
    @booking.flight.update(available_seats: @booking.flight.available_seats - @booking.total_passengers)
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
        departure_date: booking.flight.departure_date,
        arrival_date: booking.flight.arrival_date
      }
    end
  end

end
