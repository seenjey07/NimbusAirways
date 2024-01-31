class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :bookings
  has_many :passengers


  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :birth_date, presence: true
  validates :phone_number, presence: true, uniqueness: true
  validates :gender, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true, on: :create

  after_create :assign_default_role, :set_travel_fund

  private

  def assign_default_role
    update(role: 'Traveler') if role.blank?
  end

  def set_travel_fund
    update_column(:travel_fund, 0)
  end

end
