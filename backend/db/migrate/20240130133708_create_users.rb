class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :middle_name
      t.string :last_name
      t.date :birth_date
      t.string :phone_number
      t.string :gender
      t.string :role
      t.decimal :travel_fund, precision: 10, scale: 2

      t.timestamps
    end
  end
end
