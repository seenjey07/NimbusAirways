class CreatePassengers < ActiveRecord::Migration[7.1]
  def change
    create_table :passengers do |t|
      t.string :first_name
      t.string :middle_name
      t.string :last_name
      t.date :birth_date
      t.string :gender
      t.boolean :is_discounted, default: false
      t.integer :baggage_quantity, default: 0
      t.references :booking, foreign_key: true
      t.references :meal, foreign_key: true
      t.references :seat, foreign_key: true

      t.timestamps
    end
  end
end
