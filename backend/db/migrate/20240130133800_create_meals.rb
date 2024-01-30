class CreateMeals < ActiveRecord::Migration[7.1]
  def change
    create_table :meals do |t|
      t.string :food
      t.integer :quantity
      t.boolean :is_available, default: true

      t.timestamps
    end
  end
end
