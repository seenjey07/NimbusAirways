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
# require 'json'
# puts "Importing Routes data..."
# json_data = File.read(Rails.root.join('data/routesdata.json'))
# routesdata = JSON.parse(json_data)
# routesdata.each do |route|
#   Route.create(route)
# end
# puts "Routes Data successfuly imported"

# require 'json'
# puts "Importing Aircraft data..."
# json_data = File.read(Rails.root.join('data/aircraftsdata.json'))
# aircraftsdata = JSON.parse(json_data)
# aircraftsdata.each do |aircraft|
#   Aircraft.create(aircraft)
# end
# puts "Aircraft Data successfuly imported"

# puts "Importing Users data"
# json_data = File.read(Rails.root.join('data/usersdata.json'))
# usersdata = JSON.parse(json_data)
# usersdata.each do |user|
#   User.create(user)
# end
# puts "Users Data successfuly imported"

# puts "Importing all flights from February to March 2024 kapit lang WSL... Kape muna..."
# json_data = File.read(Rails.root.join('data/febmarflightsdata.json'))
# flightsdata = JSON.parse(json_data)
# flightsdata.each do |flight|
#   Flight.create(flight)
# end
# puts "Flight Data successfuly imported"



# puts "Importing Seats data kapit lang WSL..."
# json_data = File.read(Rails.root.join('data/seatsdata_february.json'))
# seatsdata = JSON.parse(json_data)
# seatsdata.each do |seat|
#   Seat.create(seat)
# end
# puts "February Seats Data successfully imported. Okay na WSL please wag na magtampo"


# json_data = File.read(Rails.root.join('data/flightsdata_february.json'))
# flightsdata = JSON.parse(json_data)
# flightsdata.each do |flight|
#   begin
#     Flight.create!(flight)
#   rescue ActiveRecord::RecordInvalid => e
#     puts "Error creating flight: #{e.message}"
#   end
# end

# flightsdata.each do |flight|
#   begin
#     Flight.create!(flight)
#   rescue ActiveRecord::RecordInvalid => e
#     puts "Error creating flight: #{e.message}"
#   end
# end






####### GENERATE TAYO USERS HERE #######
# require 'faker'
# puts "Generating User Seed data"
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
# puts "User Seed data successfully created!"
###### END OF GENERATE USERS #######





###### GENERATE TAYO FLIGHTS AND SEATS HERE #######
# puts "Generating Flight and Seat Seed data. Please wait and kapit lang WSL..."
# def generate_seats(letter, count, aircraft_id, flight_id)
#   seats = []
#   count.times do |i|
#     seats << {
#       seat_number: i + 1,
#       seat_letter: letter,
#       is_available: true,
#       aircraft_id: aircraft_id,
#       flight_id: flight_id,
#       created_at: Time.now,
#       updated_at: Time.now
#     }
#   end
#   seats
# end

# flights_data_february = []
# seats_data = []

# (3..28).each do |day|
#   (7..22).each do |hour|
#     departure_time = DateTime.new(2024, 2, day, hour, 0, 0)
#     arrival_time = departure_time + 1.hour + 30.minutes

#     flight_data = {
#       flight_number: "NA#{day}#{hour}",
#       route_id: 1,
#       departure_date: departure_time,
#       arrival_date: arrival_time,
#       available_seats: 133,
#       total_seats: 133,
#       aircraft_id: 1,
#       is_active: true,
#       gate: "A1",
#       terminal: "Terminal 1",
#       is_available: true
#     }

#     flight = Flight.create(flight_data)
#     flight_id = flight.id

#     flights_data_february << flight_data

#     ('A'..'E').each do |letter|
#       seats_data.concat(generate_seats(letter, 25, 1, flight_id))
#     end
#   end
# end

# Seat.create(seats_data)

# puts "Flight and Seat Seed data successfully created! WSL Please dont cry finish na"

# ###### END OF GENERATE FLIGHTS AND SEATS ######



# ################################### START OF FLIGHT GENERATION HERE #########################################
# require_relative '../config/environment'
# include FlightsGenerator
# ###### GENERATE AND SAVE FLIGHTS (BACK AND FORTH) HERE #######
# puts "Generating Flight Data for Boracay. Please wait and kapit lang WSL..."

# seed_params = {
#   start_month: 2,
#   end_month: 3,
#   start_day: 1,
#   end_day: 28,
#   start_hour: 5,
#   end_hour: 23,
#   aircraft_id: 1,
#   route_id: 1,
#   return_route_id: 2,
#   gate: "TBA",
#   terminal: "TBA",
#   duration: 70,
#   adjustment_time: 10
# }

# seeded_file_path = Rails.root.join('data/febmarflightsdata.json')
# existing_data = []
# if File.exist?(seeded_file_path)
#   existing_data = JSON.parse(File.read(seeded_file_path))
# end

# seeded_flights_data = generate_flights_internal(seed_params)
# all_flight_data = existing_data + seeded_flights_data
# File.open(seeded_file_path, 'w') do |file|
#   file.write(JSON.pretty_generate(all_flight_data))
# end

# puts "Flight Seed data successfully generated and saved in JSON."
# ##### END OF GENERATE AND SAVE FLIGHTS ######


# ####### GENERATE AND SAVE FLIGHTS (BACK AND FORTH) HERE #######
# puts "Generating Flight Data for Puerto Prinsesa. Please wait and kapit lang WSL..."
# seed_params = {
#   start_month: 2,
#   end_month: 3,
#   start_day: 1,
#   end_day: 28,
#   start_hour: 8,
#   end_hour: 23,
#   aircraft_id: 2,
#   route_id: 3,
#   return_route_id: 4,
#   gate: "TBA",
#   terminal: "TBA",
#   duration: 85,
#   adjustment_time: 10
# }

# seeded_file_path = Rails.root.join('data/febmarflightsdata.json')
# existing_data = []
# if File.exist?(seeded_file_path)
#   existing_data = JSON.parse(File.read(seeded_file_path))
# end

# seeded_flights_data = generate_flights_internal(seed_params)
# all_flight_data = existing_data + seeded_flights_data
# File.open(seeded_file_path, 'w') do |file|
#   file.write(JSON.pretty_generate(all_flight_data))
# end
# puts "Flight Seed data successfully generated and saved in JSON."
# ##### END OF GENERATE AND SAVE FLIGHTS AND SEATS ######

# ####### GENERATE AND SAVE FLIGHTS (BACK AND FORTH) HERE #######
# puts "Generating Flight Data for Cebu. Please wait and kapit lang WSL..."
# seed_params = {
#   start_month: 2,
#   end_month: 3,
#   start_day: 1,
#   end_day: 28,
#   start_hour: 4,
#   end_hour: 23,
#   aircraft_id: 3,
#   route_id: 5,
#   return_route_id: 6,
#   gate: "TBA",
#   terminal: "TBA",
#   duration: 95,
#   adjustment_time: 10
# }

# seeded_file_path = Rails.root.join('data/febmarflightsdata.json')
# existing_data = []
# if File.exist?(seeded_file_path)
#   existing_data = JSON.parse(File.read(seeded_file_path))
# end

# seeded_flights_data = generate_flights_internal(seed_params)
# all_flight_data = existing_data + seeded_flights_data
# File.open(seeded_file_path, 'w') do |file|
#   file.write(JSON.pretty_generate(all_flight_data))
# end
# puts "Flight Seed data successfully generated and saved in JSON."
# ##### END OF GENERATE AND SAVE FLIGHTS AND SEATS ######

# ####### GENERATE AND SAVE FLIGHTS (BACK AND FORTH) HERE #######
# puts "Generating Flight Data for Davao. Please wait and kapit lang WSL..."
# seed_params = {
#   start_month: 2,
#   end_month: 3,
#   start_day: 1,
#   end_day: 28,
#   start_hour: 4,
#   end_hour: 23,
#   aircraft_id: 4,
#   route_id: 7,
#   return_route_id: 8,
#   gate: "TBA",
#   terminal: "TBA",
#   duration: 120,
#   adjustment_time: 10
# }

# seeded_file_path = Rails.root.join('data/febmarflightsdata.json')
# existing_data = []
# if File.exist?(seeded_file_path)
#   existing_data = JSON.parse(File.read(seeded_file_path))
# end

# seeded_flights_data = generate_flights_internal(seed_params)
# all_flight_data = existing_data + seeded_flights_data
# File.open(seeded_file_path, 'w') do |file|
#   file.write(JSON.pretty_generate(all_flight_data))
# end
# puts "Flight Seed data successfully generated and saved in JSON."
# ##### END OF GENERATE AND SAVE FLIGHTS AND SEATS ######

# ####### GENERATE AND SAVE FLIGHTS (BACK AND FORTH) HERE #######
# puts "Generating Flight Data for Tagbilaran. Please wait and kapit lang WSL..."
# seed_params = {
#   start_month: 2,
#   end_month: 3,
#   start_day: 1,
#   end_day: 28,
#   start_hour: 8,
#   end_hour: 22,
#   aircraft_id: 5,
#   route_id: 9,
#   return_route_id: 10,
#   gate: "TBA",
#   terminal: "TBA",
#   duration: 120,
#   adjustment_time: 10
# }

# seeded_file_path = Rails.root.join('data/febmarflightsdata.json')
# existing_data = []
# if File.exist?(seeded_file_path)
#   existing_data = JSON.parse(File.read(seeded_file_path))
# end

# seeded_flights_data = generate_flights_internal(seed_params)
# all_flight_data = existing_data + seeded_flights_data
# File.open(seeded_file_path, 'w') do |file|
#   file.write(JSON.pretty_generate(all_flight_data))
# end
# puts "Flight Seed data successfully generated and saved in JSON."
# ##### END OF GENERATE AND SAVE FLIGHTS AND SEATS ######

# ####### GENERATE AND SAVE FLIGHTS (BACK AND FORTH) HERE #######
# puts "Generating Flight Data for Bacolod. Please wait and kapit lang WSL..."
# seed_params = {
#   start_month: 2,
#   end_month: 3,
#   start_day: 1,
#   end_day: 28,
#   start_hour: 8,
#   end_hour: 22,
#   aircraft_id: 6,
#   route_id: 11,
#   return_route_id: 12,
#   gate: "TBA",
#   terminal: "TBA",
#   duration: 80,
#   adjustment_time: 10
# }

# seeded_file_path = Rails.root.join('data/febmarflightsdata.json')
# existing_data = []
# if File.exist?(seeded_file_path)
#   existing_data = JSON.parse(File.read(seeded_file_path))
# end

# seeded_flights_data = generate_flights_internal(seed_params)
# all_flight_data = existing_data + seeded_flights_data
# File.open(seeded_file_path, 'w') do |file|
#   file.write(JSON.pretty_generate(all_flight_data))
# end
# puts "Flight Seed data successfully generated and saved in JSON."
# ##### END OF GENERATE AND SAVE FLIGHTS AND SEATS ######

# ####### GENERATE AND SAVE FLIGHTS (BACK AND FORTH) HERE #######
# puts "Generating Flight Data for Coron. Please wait and kapit lang WSL..."
# seed_params = {
#   start_month: 2,
#   end_month: 3,
#   start_day: 1,
#   end_day: 28,
#   start_hour: 9,
#   end_hour: 20,
#   aircraft_id: 7,
#   route_id: 13,
#   return_route_id: 14,
#   gate: "TBA",
#   terminal: "TBA",
#   duration: 70,
#   adjustment_time: 10
# }

# seeded_file_path = Rails.root.join('data/febmarflightsdata.json')
# existing_data = []
# if File.exist?(seeded_file_path)
#   existing_data = JSON.parse(File.read(seeded_file_path))
# end

# seeded_flights_data = generate_flights_internal(seed_params)
# all_flight_data = existing_data + seeded_flights_data
# File.open(seeded_file_path, 'w') do |file|
#   file.write(JSON.pretty_generate(all_flight_data))
# end
# puts "Flight Seed data successfully generated and saved in JSON."
# ##### END OF GENERATE AND SAVE FLIGHTS AND SEATS ######

# ####### GENERATE AND SAVE FLIGHTS (BACK AND FORTH) HERE #######
# puts "Generating Flight Data for Siargao. Please wait and kapit lang WSL..."
# seed_params = {
#   start_month: 2,
#   end_month: 3,
#   start_day: 1,
#   end_day: 28,
#   start_hour: 9,
#   end_hour: 20,
#   aircraft_id: 8,
#   route_id: 15,
#   return_route_id: 16,
#   gate: "TBA",
#   terminal: "TBA",
#   duration: 135,
#   adjustment_time: 10
# }

# seeded_file_path = Rails.root.join('data/febmarflightsdata.json')
# existing_data = []
# if File.exist?(seeded_file_path)
#   existing_data = JSON.parse(File.read(seeded_file_path))
# end

# seeded_flights_data = generate_flights_internal(seed_params)
# all_flight_data = existing_data + seeded_flights_data
# File.open(seeded_file_path, 'w') do |file|
#   file.write(JSON.pretty_generate(all_flight_data))
# end
# puts "Flight Seed data successfully generated and saved in JSON."
##### END OF GENERATE AND SAVE FLIGHTS AND SEATS ######

# ################################################END OF FLIGHT GENERATION HERE ################################################

# User.create!(
#   first_name: "Super",
#   last_name: "Admin",
#   email: "admin@nimbusairways.com",
#   password: "password123",
#   role: "superadmin",
#   birth_date: Date.new(1980, 1, 1),
#   phone_number: "1234567890",
#   gender: "Male",
#   travel_fund: 0.00
# )
# puts "SuperAdmin successfully created!"

User.create!(
  first_name: "Super",
  last_name: "Admin",
  email: "1@test.com",
  password: "123456",
  role: "superadmin",
  birth_date: Date.new(1980, 1, 1),
  phone_number: "1541234120",
  gender: "Male",
  travel_fund: 0.00,
  confirmed_at: Time.now
)

puts "SuperAdmin successfully created with confirmed_at set to today!"
