# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_01_30_133933) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "aircrafts", force: :cascade do |t|
    t.string "model"
    t.string "family"
    t.integer "seat_capacity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bookings", force: :cascade do |t|
    t.bigint "user_id"
    t.string "booking_reference"
    t.boolean "is_confirmed", default: false
    t.datetime "confirmation_date"
    t.bigint "flight_id"
    t.integer "total_passengers", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["flight_id"], name: "index_bookings_on_flight_id"
    t.index ["user_id"], name: "index_bookings_on_user_id"
  end

  create_table "flights", force: :cascade do |t|
    t.string "flight_number"
    t.bigint "route_id"
    t.datetime "departure_date"
    t.datetime "arrival_date"
    t.integer "available_seats"
    t.integer "total_seats"
    t.bigint "aircraft_id"
    t.boolean "is_active", default: true
    t.string "gate"
    t.string "terminal"
    t.boolean "is_available", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["aircraft_id"], name: "index_flights_on_aircraft_id"
    t.index ["route_id"], name: "index_flights_on_route_id"
  end

  create_table "meals", force: :cascade do |t|
    t.string "food"
    t.integer "quantity"
    t.boolean "is_available", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "passengers", force: :cascade do |t|
    t.string "first_name"
    t.string "middle_name"
    t.string "last_name"
    t.date "birth_date"
    t.string "gender"
    t.boolean "is_discounted", default: false
    t.integer "baggage_quantity", default: 0
    t.bigint "booking_id"
    t.bigint "meal_id"
    t.bigint "seat_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["booking_id"], name: "index_passengers_on_booking_id"
    t.index ["meal_id"], name: "index_passengers_on_meal_id"
    t.index ["seat_id"], name: "index_passengers_on_seat_id"
  end

  create_table "routes", force: :cascade do |t|
    t.string "origin_location"
    t.string "origin_code"
    t.string "origin_name"
    t.string "destination_location"
    t.string "destination_code"
    t.string "destination_name"
    t.decimal "price", precision: 10, scale: 2
    t.boolean "is_available", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "seats", force: :cascade do |t|
    t.string "seat_number"
    t.string "seat_letter"
    t.boolean "is_available", default: true
    t.bigint "aircraft_id"
    t.bigint "flight_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["aircraft_id"], name: "index_seats_on_aircraft_id"
    t.index ["flight_id"], name: "index_seats_on_flight_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "middle_name"
    t.string "last_name"
    t.date "birth_date"
    t.string "phone_number"
    t.string "gender"
    t.string "role"
    t.decimal "travel_fund", precision: 10, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "jti"
    t.index ["jti"], name: "index_users_on_jti"
  end

  add_foreign_key "bookings", "flights"
  add_foreign_key "bookings", "users"
  add_foreign_key "flights", "aircrafts"
  add_foreign_key "flights", "routes"
  add_foreign_key "passengers", "bookings"
  add_foreign_key "passengers", "meals"
  add_foreign_key "passengers", "seats"
  add_foreign_key "seats", "aircrafts"
  add_foreign_key "seats", "flights"
end
