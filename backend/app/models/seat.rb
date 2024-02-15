class Seat < ApplicationRecord
  belongs_to :flight
  belongs_to :aircraft
  has_many :passengers

  def self.get_seats_for_flight(flight_id)
    Seat.where(flight_id: flight_id)
  end
end
