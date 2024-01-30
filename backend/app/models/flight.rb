class Flight < ApplicationRecord
  belongs_to :route
  belongs_to :aircraft
  has_many :bookings
end
