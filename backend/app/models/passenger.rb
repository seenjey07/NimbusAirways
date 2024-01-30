class Passenger < ApplicationRecord
  belongs_to :booking
  belongs_to :meal
  belongs_to :seat
end
