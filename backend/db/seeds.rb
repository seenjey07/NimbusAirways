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
puts "Importing Routes data..."
json_data = File.read(Rails.root.join('data/routesdata.json'))
routesdata = JSON.parse(json_data)
routesdata.each do |route|
  Route.create(route)
end
puts "Routes Data successfuly imported"

require 'json'
puts "Importing Aircraft data..."
json_data = File.read(Rails.root.join('data/aircraftsdata.json'))
aircraftsdata = JSON.parse(json_data)
aircraftsdata.each do |aircraft|
  Aircraft.create(aircraft)
end
puts "Aircraft Data successfuly imported"

puts "Importing Users data"
json_data = File.read(Rails.root.join('data/usersdata.json'))
usersdata = JSON.parse(json_data)
usersdata.each do |user|
  User.create(user)
end
puts "Users Data successfuly imported"

puts "Importing all flights from February to March 2024 kapit lang WSL... Kape muna..."
json_data = File.read(Rails.root.join('data/febmarflightsdata.json'))
flightsdata = JSON.parse(json_data)
flightsdata.each do |flight|
  Flight.create(flight)
end
puts "Flight Data successfuly imported"



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

# ###### GENERATE AND SAVE FLIGHTS (BACK AND FORTH) HERE #######
# puts "Generating Flight Data from February to December for Boracay. Please wait and kapit lang WSL..."
# flights_data_march_to_december = []

# (2..3).each do |month|
#   days_in_month = Time.days_in_month(month, 2024)

#   (1..days_in_month).each do |day|
#     (6..22).each do |hour|
#       departure_time = DateTime.new(2024, month, day, hour, 0, 0)
#       arrival_time = departure_time + 1.hour + 30.minutes

#       departure_flight_data = {
#         flight_number: "NA11#{month}#{day}#{hour}",
#         route_id: 1,
#         departure_date: departure_time,
#         arrival_date: arrival_time,
#         available_seats: 133,
#         total_seats: 133,
#         aircraft_id: 1,
#         is_active: true,
#         gate: "A1",
#         terminal: "Terminal 3",
#         is_available: true
#       }

#       departure_flight = Flight.create(departure_flight_data)
#       departure_flight_id = departure_flight.id

#       flights_data_march_to_december << departure_flight_data

#       return_departure_time = arrival_time + 20.minutes
#       return_arrival_time = return_departure_time + 1.hours + 30.minutes

#       return_flight_data = {
#         flight_number: "NA12#{month}#{day}#{hour}",
#         route_id: 2,
#         departure_date: return_departure_time,
#         arrival_date: return_arrival_time,
#         available_seats: 133,
#         total_seats: 133,
#         aircraft_id: 1,
#         is_active: true,
#         gate: "B1",
#         terminal: "Terminal A",
#         is_available: true
#       }

#       return_flight = Flight.create(return_flight_data)
#       return_flight_id = return_flight.id

#       flights_data_march_to_december << return_flight_data
#     end
#   end
# end

# existing_data = []
# existing_file_path = Rails.root.join('data/febmarflightsdata.json')
# if File.exist?(existing_file_path)
#   existing_data = JSON.parse(File.read(existing_file_path))
# end

# all_flight_data = existing_data + flights_data_march_to_december

# File.open(existing_file_path, 'w') do |file|
#   file.write(JSON.pretty_generate(all_flight_data))
# end

# puts "Flight Seed data successfully created and saved in JSON"
# ##### END OF GENERATE AND SAVE FLIGHTS ######

# ###### GENERATE AND SAVE FLIGHTS (BACK AND FORTH) HERE #######
# puts "Generating Flight Data from February to December for Puerto Prinsesa. Please wait and kapit lang WSL..."
# flights_data_march_to_december = []

# (2..3).each do |month|
#   days_in_month = Time.days_in_month(month, 2024)

#   (1..days_in_month).each do |day|
#     (6..22).each do |hour|
#       departure_time = DateTime.new(2024, month, day, hour, 0, 0)
#       arrival_time = departure_time + 1.hours + 50.minutes

#       departure_flight_data = {
#         flight_number: "NA23#{month}#{day}#{hour}",
#         route_id: 3,
#         departure_date: departure_time,
#         arrival_date: arrival_time,
#         available_seats: 133,
#         total_seats: 133,
#         aircraft_id: 2,
#         is_active: true,
#         gate: "A1",
#         terminal: "Terminal 3",
#         is_available: true
#       }

#       departure_flight = Flight.create(departure_flight_data)
#       departure_flight_id = departure_flight.id

#       flights_data_march_to_december << departure_flight_data

#       return_departure_time = arrival_time + 20.minutes
#       return_arrival_time = return_departure_time + 1.hours + 50.minutes

#       return_flight_data = {
#         flight_number: "NA24#{month}#{day}#{hour}",
#         route_id: 4,
#         departure_date: return_departure_time,
#         arrival_date: return_arrival_time,
#         available_seats: 133,
#         total_seats: 133,
#         aircraft_id: 2,
#         is_active: true,
#         gate: "A",
#         terminal: "Terminal Main",
#         is_available: true
#       }

#       return_flight = Flight.create(return_flight_data)
#       return_flight_id = return_flight.id

#       flights_data_march_to_december << return_flight_data
#     end
#   end
# end

# existing_data = []
# existing_file_path = Rails.root.join('data/febmarflightsdata.json')
# if File.exist?(existing_file_path)
#   existing_data = JSON.parse(File.read(existing_file_path))
# end

# all_flight_data = existing_data + flights_data_march_to_december

# File.open(existing_file_path, 'w') do |file|
#   file.write(JSON.pretty_generate(all_flight_data))
# end

# puts "Flight Seed data successfully created and saved in JSON"
# ##### END OF GENERATE AND SAVE FLIGHTS AND SEATS ######

# ###### GENERATE AND SAVE FLIGHTS (BACK AND FORTH) HERE #######
# puts "Generating Flight Data from February to December for Cebu. Please wait and kapit lang WSL..."
# flights_data_march_to_december = []

# (2..3).each do |month|
#   days_in_month = Time.days_in_month(month, 2024)

#   (1..days_in_month).each do |day|
#     (5..23).each do |hour|
#       departure_time = DateTime.new(2024, month, day, hour, 0, 0)
#       arrival_time = departure_time + 1.hours + 55.minutes

#       departure_flight_data = {
#         flight_number: "NA35#{month}#{day}#{hour}",
#         route_id: 5,
#         departure_date: departure_time,
#         arrival_date: arrival_time,
#         available_seats: 180,
#         total_seats: 180,
#         aircraft_id: 3,
#         is_active: true,
#         gate: "A1",
#         terminal: "Terminal 3",
#         is_available: true
#       }

#       departure_flight = Flight.create(departure_flight_data)
#       departure_flight_id = departure_flight.id

#       flights_data_march_to_december << departure_flight_data

#       return_departure_time = arrival_time + 20.minutes
#       return_arrival_time = return_departure_time + 1.hours + 55.minutes

#       return_flight_data = {
#         flight_number: "NA36#{month}#{day}#{hour}",
#         route_id: 6,
#         departure_date: return_departure_time,
#         arrival_date: return_arrival_time,
#         available_seats: 180,
#         total_seats: 180,
#         aircraft_id: 3,
#         is_active: true,
#         gate: "A3",
#         terminal: "Terminal 1",
#         is_available: true
#       }

#       return_flight = Flight.create(return_flight_data)
#       return_flight_id = return_flight.id

#       flights_data_march_to_december << return_flight_data
#     end
#   end
# end

# existing_data = []
# existing_file_path = Rails.root.join('data/febmarflightsdata.json')
# if File.exist?(existing_file_path)
#   existing_data = JSON.parse(File.read(existing_file_path))
# end

# all_flight_data = existing_data + flights_data_march_to_december

# File.open(existing_file_path, 'w') do |file|
#   file.write(JSON.pretty_generate(all_flight_data))
# end

# puts "Flight Seed data successfully created and saved in JSON"
# ##### END OF GENERATE AND SAVE FLIGHTS AND SEATS ######

# ###### GENERATE AND SAVE FLIGHTS (BACK AND FORTH) HERE #######
# puts "Generating Flight Data from February to December for Davao. Please wait and kapit lang WSL..."
# flights_data_march_to_december = []

# (2..3).each do |month|
#   days_in_month = Time.days_in_month(month, 2024)

#   (1..days_in_month).each do |day|
#     (7..23).each do |hour|
#       departure_time = DateTime.new(2024, month, day, hour, 0, 0)
#       arrival_time = departure_time + 2.hours + 20.minutes

#       departure_flight_data = {
#         flight_number: "NA47#{month}#{day}#{hour}",
#         route_id: 7,
#         departure_date: departure_time,
#         arrival_date: arrival_time,
#         available_seats: 180,
#         total_seats: 180,
#         aircraft_id: 4,
#         is_active: true,
#         gate: "A1",
#         terminal: "Terminal 3",
#         is_available: true
#       }

#       departure_flight = Flight.create(departure_flight_data)
#       departure_flight_id = departure_flight.id

#       flights_data_march_to_december << departure_flight_data

#       return_departure_time = arrival_time + 20.minutes
#       return_arrival_time = return_departure_time + 2.hours + 20.minutes

#       return_flight_data = {
#         flight_number: "NA48#{month}#{day}#{hour}",
#         route_id: 8,
#         departure_date: return_departure_time,
#         arrival_date: return_arrival_time,
#         available_seats: 180,
#         total_seats: 180,
#         aircraft_id: 4,
#         is_active: true,
#         gate: "A3",
#         terminal: "Terminal 2",
#         is_available: true
#       }

#       return_flight = Flight.create(return_flight_data)
#       return_flight_id = return_flight.id

#       flights_data_march_to_december << return_flight_data
#     end
#   end
# end

# existing_data = []
# existing_file_path = Rails.root.join('data/febmarflightsdata.json')
# if File.exist?(existing_file_path)
#   existing_data = JSON.parse(File.read(existing_file_path))
# end

# all_flight_data = existing_data + flights_data_march_to_december

# File.open(existing_file_path, 'w') do |file|
#   file.write(JSON.pretty_generate(all_flight_data))
# end

# puts "Flight Seed data successfully created and saved in JSON"
# ##### END OF GENERATE AND SAVE FLIGHTS AND SEATS ######

# ###### GENERATE AND SAVE FLIGHTS (BACK AND FORTH) HERE #######
# puts "Generating Flight Data from February to December for Tagbilaran. Please wait and kapit lang WSL..."
# flights_data_march_to_december = []

# (2..3).each do |month|
#   days_in_month = Time.days_in_month(month, 2024)

#   (1..days_in_month).each do |day|
#     (7..23).each do |hour|
#       departure_time = DateTime.new(2024, month, day, hour, 0, 0)
#       arrival_time = departure_time + 1.hours + 55.minutes

#       departure_flight_data = {
#         flight_number: "NA59#{month}#{day}#{hour}",
#         route_id: 9,
#         departure_date: departure_time,
#         arrival_date: arrival_time,
#         available_seats: 133,
#         total_seats: 133,
#         aircraft_id: 5,
#         is_active: true,
#         gate: "A1",
#         terminal: "Terminal 3",
#         is_available: true
#       }

#       departure_flight = Flight.create(departure_flight_data)
#       departure_flight_id = departure_flight.id

#       flights_data_march_to_december << departure_flight_data

#       return_departure_time = arrival_time + 20.minutes
#       return_arrival_time = return_departure_time + 1.hours + 55.minutes

#       return_flight_data = {
#         flight_number: "NA510#{month}#{day}#{hour}",
#         route_id: 10,
#         departure_date: return_departure_time,
#         arrival_date: return_arrival_time,
#         available_seats: 133,
#         total_seats: 133,
#         aircraft_id: 5,
#         is_active: true,
#         gate: "A3",
#         terminal: "Terminal 2",
#         is_available: true
#       }

#       return_flight = Flight.create(return_flight_data)
#       return_flight_id = return_flight.id

#       flights_data_march_to_december << return_flight_data
#     end
#   end
# end

# existing_data = []
# existing_file_path = Rails.root.join('data/febmarflightsdata.json')
# if File.exist?(existing_file_path)
#   existing_data = JSON.parse(File.read(existing_file_path))
# end

# all_flight_data = existing_data + flights_data_march_to_december

# File.open(existing_file_path, 'w') do |file|
#   file.write(JSON.pretty_generate(all_flight_data))
# end

# puts "Flight and Seed data successfully created and saved in JSON"
# ##### END OF GENERATE AND SAVE FLIGHTS AND SEATS ######

# ###### GENERATE AND SAVE FLIGHTS (BACK AND FORTH) HERE #######
# puts "Generating Flight Data from February to December for Bacolod. Please wait and kapit lang WSL..."
# flights_data_march_to_december = []

# (2..3).each do |month|
#   days_in_month = Time.days_in_month(month, 2024)

#   (1..days_in_month).each do |day|
#     (7..23).each do |hour|
#       departure_time = DateTime.new(2024, month, day, hour, 0, 0)
#       arrival_time = departure_time + 1.hours + 40.minutes

#       departure_flight_data = {
#         flight_number: "NA611#{month}#{day}#{hour}",
#         route_id: 11,
#         departure_date: departure_time,
#         arrival_date: arrival_time,
#         available_seats: 133,
#         total_seats: 133,
#         aircraft_id: 6,
#         is_active: true,
#         gate: "A1",
#         terminal: "Terminal 3",
#         is_available: true
#       }

#       departure_flight = Flight.create(departure_flight_data)
#       departure_flight_id = departure_flight.id

#       flights_data_march_to_december << departure_flight_data

#       return_departure_time = arrival_time + 20.minutes
#       return_arrival_time = return_departure_time + 1.hours + 40.minutes

#       return_flight_data = {
#         flight_number: "NA612#{month}#{day}#{hour}",
#         route_id: 12,
#         departure_date: return_departure_time,
#         arrival_date: return_arrival_time,
#         available_seats: 133,
#         total_seats: 133,
#         aircraft_id: 6,
#         is_active: true,
#         gate: "A",
#         terminal: "Terminal Main",
#         is_available: true
#       }

#       return_flight = Flight.create(return_flight_data)
#       return_flight_id = return_flight.id

#       flights_data_march_to_december << return_flight_data
#     end
#   end
# end

# existing_data = []
# existing_file_path = Rails.root.join('data/febmarflightsdata.json')
# if File.exist?(existing_file_path)
#   existing_data = JSON.parse(File.read(existing_file_path))
# end

# all_flight_data = existing_data + flights_data_march_to_december

# File.open(existing_file_path, 'w') do |file|
#   file.write(JSON.pretty_generate(all_flight_data))
# end

# puts "Flight Seed data successfully created and saved in JSON"
# ##### END OF GENERATE AND SAVE FLIGHTS AND SEATS ######

# ###### GENERATE AND SAVE FLIGHTS (BACK AND FORTH) HERE #######
# puts "Generating Flight Data from February to December for Coron. Please wait and kapit lang WSL..."
# flights_data_march_to_december = []

# (2..3).each do |month|
#   days_in_month = Time.days_in_month(month, 2024)

#   (1..days_in_month).each do |day|
#     (9..20).each do |hour|
#       departure_time = DateTime.new(2024, month, day, hour, 0, 0)
#       arrival_time = departure_time + 1.hours + 30.minutes

#       departure_flight_data = {
#         flight_number: "NA713#{month}#{day}#{hour}",
#         route_id: 13,
#         departure_date: departure_time,
#         arrival_date: arrival_time,
#         available_seats: 72,
#         total_seats: 72,
#         aircraft_id: 7,
#         is_active: true,
#         gate: "A1",
#         terminal: "Terminal 4",
#         is_available: true
#       }

#       departure_flight = Flight.create(departure_flight_data)
#       departure_flight_id = departure_flight.id

#       flights_data_march_to_december << departure_flight_data

#       return_departure_time = arrival_time + 20.minutes
#       return_arrival_time = return_departure_time + 1.hours + 30.minutes

#       return_flight_data = {
#         flight_number: "NA714#{month}#{day}#{hour}",
#         route_id: 14,
#         departure_date: return_departure_time,
#         arrival_date: return_arrival_time,
#         available_seats: 72,
#         total_seats: 72,
#         aircraft_id: 7,
#         is_active: true,
#         gate: "A",
#         terminal: "Terminal 1",
#         is_available: true
#       }

#       return_flight = Flight.create(return_flight_data)
#       return_flight_id = return_flight.id

#       flights_data_march_to_december << return_flight_data
#     end
#   end
# end

# existing_data = []
# existing_file_path = Rails.root.join('data/febmarflightsdata.json')
# if File.exist?(existing_file_path)
#   existing_data = JSON.parse(File.read(existing_file_path))
# end

# all_flight_data = existing_data + flights_data_march_to_december

# File.open(existing_file_path, 'w') do |file|
#   file.write(JSON.pretty_generate(all_flight_data))
# end

# puts "Flight Seed data successfully created and saved in JSON"
# ##### END OF GENERATE AND SAVE FLIGHTS AND SEATS ######

# ###### GENERATE AND SAVE FLIGHTS (BACK AND FORTH) HERE #######
# puts "Generating Flight Data from February to December for Siargao. Please wait and kapit lang WSL..."
# flights_data_march_to_december = []

# (2..3).each do |month|
#   days_in_month = Time.days_in_month(month, 2024)

#   (1..days_in_month).each do |day|
#     (9..20).each do |hour|
#       departure_time = DateTime.new(2024, month, day, hour, 0, 0)
#       arrival_time = departure_time + 2.hours + 35.minutes

#       departure_flight_data = {
#         flight_number: "NA815#{month}#{day}#{hour}",
#         route_id: 15,
#         departure_date: departure_time,
#         arrival_date: arrival_time,
#         available_seats: 72,
#         total_seats: 72,
#         aircraft_id: 8,
#         is_active: true,
#         gate: "A1",
#         terminal: "Terminal 4",
#         is_available: true
#       }

#       departure_flight = Flight.create(departure_flight_data)
#       departure_flight_id = departure_flight.id

#       flights_data_march_to_december << departure_flight_data

#       return_departure_time = arrival_time + 20.minutes
#       return_arrival_time = return_departure_time + 2.hours + 35.minutes

#       return_flight_data = {
#         flight_number: "NA816#{month}#{day}#{hour}",
#         route_id: 16,
#         departure_date: return_departure_time,
#         arrival_date: return_arrival_time,
#         available_seats: 72,
#         total_seats: 72,
#         aircraft_id: 8,
#         is_active: true,
#         gate: "A",
#         terminal: "Terminal 1",
#         is_available: true
#       }

#       return_flight = Flight.create(return_flight_data)
#       return_flight_id = return_flight.id

#       flights_data_march_to_december << return_flight_data
#     end
#   end
# end

# existing_data = []
# existing_file_path = Rails.root.join('data/febmarflightsdata.json')
# if File.exist?(existing_file_path)
#   existing_data = JSON.parse(File.read(existing_file_path))
# end

# all_flight_data = existing_data + flights_data_march_to_december

# File.open(existing_file_path, 'w') do |file|
#   file.write(JSON.pretty_generate(all_flight_data))
# end

# puts "Flight Seed data successfully created and saved in JSON"
# ##### END OF GENERATE AND SAVE FLIGHTS AND SEATS ######

################################################END OF FLIGHT GENERATION HERE ################################################

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
puts "SuperAdmin successfully created!"
