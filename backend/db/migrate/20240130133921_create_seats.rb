class CreateSeats < ActiveRecord::Migration[7.1]
  def change
    create_table :seats do |t|
      t.string :seat_number
      t.string :seat_letter
      t.boolean :is_available, default: true
      t.references :aircraft, foreign_key: true
      t.references :flight, foreign_key: true

      t.timestamps
    end
  end
end
