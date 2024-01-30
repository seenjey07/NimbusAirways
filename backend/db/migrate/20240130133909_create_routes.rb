class CreateRoutes < ActiveRecord::Migration[7.1]
  def change
    create_table :routes do |t|
      t.string :origin_location
      t.string :origin_code
      t.string :origin_name
      t.string :destination_location
      t.string :destination_code
      t.string :destination_name
      t.decimal :price, precision: 10, scale: 2
      t.boolean :is_available, default: true

      t.timestamps
    end
  end
end
