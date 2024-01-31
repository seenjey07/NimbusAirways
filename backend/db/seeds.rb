# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
Aircraft.create!(
  model: "A320",
  family: "Airbus A320",
  seat_capacity: 180
)

# Seed data for routes table
Route.create!(
  origin_location: "Manila",
  origin_code: "MNL",
  origin_name: "Ninoy Aquino International Airport",
  destination_location: "Palawan",
  destination_code: "PPS",
  destination_name: "Puerto Princesa International Airport",
  price: 150.00
)

# Seed data for flights table
Flight.create!(
  flight_number: "PR123",
  route_id: Route.first.id,
  departure_date: DateTime.new(2024, 3, 1, 8, 0, 0),
  arrival_date: DateTime.new(2024, 3, 1, 10, 0, 0),
  available_seats: 180,
  total_seats: 180,
  aircraft_id: Aircraft.first.id,
  is_active: true,
  gate: "A1",
  terminal: "Terminal 1",
  is_available: true
)

# Seed data for bookings table
Booking.create!(
  user_id: 1, # Replace with the actual user ID
  booking_reference: "ABC123",
  is_confirmed: true,
  confirmation_date: DateTime.new(2024, 2, 15, 12, 0, 0),
  flight_id: Flight.first.id
)

User.create!(
  first_name: "Super",
  last_name: "Admin",
  email: "admin@nimbusairways.com",
  password: "password123",
  role: "superadmin",
  birth_date: Date.new(1980, 1, 1),
  phone_number: "1234567890",
  gender: "Male",
  travel_fund: 0.00
)
