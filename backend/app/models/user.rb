class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
  :recoverable, :rememberable, :validatable,
  :jwt_authenticatable, jwt_revocation_strategy: self
  devise :omniauthable, omniauth_providers: [:google_oauth2, :github]

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

  def self.signin_or_create_from_provider(provider_data)
    where(provider: provider_data[:provider], uid: provider_data[:uid]).first_or_create do |user|
      user.email = provider_data[:info][:email]
      user.password = Devise.friendly_token[0, 20]
      user.skip_confirmation!
    end
  end



  # def self.from_omniauth(access_token)
  #   data = access_token.info
  #   user = User.where(email: data['email']).first
  #    unless user
  #       user = User.create(
  #          email: data['email'],
  #          password: Devise.friendly_token[0,20]
  #       )
  #   end
  #   user
  # end
  def generate_password_token!
    self.reset_password_token = SecureRandom.urlsafe_base64
    self.reset_password_sent_at = Time.now.utc
    save!
  end


   def password_token_valid?
    (self.reset_password_sent_at + 4.hours) > Time.now.utc
   end

   def reset_password!(password)
    self.reset_password_token = nil
    self.password = password
    save!
   end

  private

  def assign_default_role
    update(role: 'Traveler') if role.blank?
  end

  def set_travel_fund
    update_column(:travel_fund, 0)
  end

  def generate_token
    SecureRandom.hex(10)
   end
end
