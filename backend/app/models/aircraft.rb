class Aircraft < ApplicationRecord
  has_many :flights
  has_many :seats

  has_many :routes, through: :flights

  def current_route
    routes.order('flights.created_at DESC').first
  end
end
