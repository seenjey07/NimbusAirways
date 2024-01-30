class CreateFlights < ActiveRecord::Migration[7.1]
  def change
    create_table :flights do |t|
      t.string :flight_number
      t.references :route, foreign_key: true
      t.datetime :departure_date
      t.datetime :arrival_date
      t.integer :available_seats
      t.integer :total_seats
      t.references :aircraft, foreign_key: true
      t.boolean :is_active, default: true
      t.string :gate
      t.string :terminal
      t.boolean :is_available, default: true

      t.timestamps
    end
  end
end
