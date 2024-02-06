class Passenger < ApplicationRecord
  belongs_to :booking
  belongs_to :meal, optional: true
  belongs_to :seat
end
