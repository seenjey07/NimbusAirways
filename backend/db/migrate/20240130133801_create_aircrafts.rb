class CreateAircrafts < ActiveRecord::Migration[7.1]
  def change
    create_table :aircrafts do |t|
      t.string :model
      t.string :family
      t.integer :seat_capacity

      t.timestamps
    end
  end
end
