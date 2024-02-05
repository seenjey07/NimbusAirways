class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :flight
  has_many :passengers

  before_save :update_booking_after_save

  private

  def update_booking_after_save
    flight.update(available_seats: flight.available_seats - total_passengers)
    self.confirmation_date ||= Date.today
  end
end
