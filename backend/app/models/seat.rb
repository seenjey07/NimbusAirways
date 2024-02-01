class Seat < ApplicationRecord
  belongs_to :aircraft
  has_many :passengers
end
