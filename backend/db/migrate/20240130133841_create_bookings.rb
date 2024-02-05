class CreateBookings < ActiveRecord::Migration[7.1]
  def change
    create_table :bookings do |t|
      t.references :user, foreign_key: true
      t.string :booking_reference
      t.boolean :is_confirmed, default: false
      t.datetime :confirmation_date
      t.references :flight, foreign_key: true
      t.integer :total_passengers, default: 0

      t.timestamps
    end
  end
end
