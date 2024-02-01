# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
# Seed data for bookings table



require 'json'
json_data = File.read(Rails.root.join('data/flightsdata_february.json'))
flightsdata = JSON.parse(json_data)
flightsdata.each do |flight|
  Flight.create(flight)
end

require 'json'
json_data = File.read(Rails.root.join('data/routesdata.json'))
routesdata = JSON.parse(json_data)
routesdata.each do |route|
  Route.create(route)
end

require 'json'
json_data = File.read(Rails.root.join('data/aircraftsdata.json'))
aircraftsdata = JSON.parse(json_data)
aircraftsdata.each do |aircraft|
  Aircraft.create(aircraft)
end

require 'json'
json_data = File.read(Rails.root.join('data/usersdata.json'))
usersdata = JSON.parse(json_data)
usersdata.each do |user|
  User.create(user)
end



## GENERATE TAYO USERS HERE ##
# require 'faker'

# random_users = []

# 100.times do
#   random_users << {
#     first_name: Faker::Name.first_name,
#     middle_name: Faker::Name.middle_name,
#     last_name: Faker::Name.last_name,
#     birth_date: Faker::Date.birthday(min_age: 18, max_age: 80),
#     phone_number: Faker::PhoneNumber.cell_phone,
#     gender: Faker::Gender.binary_type,
#     role: 'Traveler',
#     travel_fund: 0.0,
#     email: Faker::Internet.unique.email,
#     encrypted_password: '$2a$12$abcdefghijklmnopqrstuvwx/yz0123456789ABCDEF',
#     confirmed_at: Faker::Time.between(from: 2.years.ago, to: Time.now),
#     jti: SecureRandom.uuid
#   }
# end


# File.open(Rails.root.join('data/usersdata.json'), 'w') do |file|
#   file.write(JSON.pretty_generate(random_users))
# end


# random_users.each do |user|
#   User.create!(user)
# end

## END OF GENERATE USERS ##

## GENERATE TAYO FLIGHTS HERE ##
# route_id_manila_to_boracay = 1
# route_id_boracay_to_manila = 2
# aircraft_id_atr_72 = 1


# flights_data_february = []

# (1..28).each do |day|
#   (7..22).each do |hour|
#     departure_time = DateTime.new(2024, 2, day, hour, 0, 0)
#     arrival_time = departure_time + 1.hour + 30.minutes

#     flights_data_february << {
#       "flight_number": "NA-MPH-#{day}-#{hour}",
#       "route_id": 1,
#       "departure_date": departure_time,
#       "arrival_date": arrival_time,
#       "available_seats": 72,
#       "total_seats": 72,
#       "aircraft_id": 1,
#       "is_active": true,
#       "gate": "A1",
#       "terminal": "Terminal 1",
#       "is_available": true
#     }

#     flights_data_february << {
#       "flight_number": "NA-MNL-#{day}-#{hour}",
#       "route_id": 2,
#       "departure_date": departure_time + 10.minutes,
#       "arrival_date": arrival_time + 10.minutes,
#       "available_seats": 72,
#       "total_seats": 72,
#       "aircraft_id": 1,
#       "is_active": true,
#       "gate": "B2",
#       "terminal": "Terminal 2",
#       "is_available": true
#     }
#   end
# end

# File.open(Rails.root.join('data/flightsdata_february.json'), 'w') do |file|
#   file.write(JSON.pretty_generate(flights_data_february))
# end

# flights_data_february.each do |flight|
#   Flight.create!(flight)
# end

# puts "Seed data successfully created!"

## END OF FLIGHT GENERATIONS ##




Booking.create!(
  user_id: 1,
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
