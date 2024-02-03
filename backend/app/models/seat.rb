class Seat < ApplicationRecord
  belongs_to :flight
  belongs_to :aircraft
  has_many :passengers
end
