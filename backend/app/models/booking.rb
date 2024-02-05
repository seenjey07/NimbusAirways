class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :flight
  has_many :passengers
end
