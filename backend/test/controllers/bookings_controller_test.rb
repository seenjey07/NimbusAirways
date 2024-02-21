require 'test_helper'

class BookingsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  def setup
    @user = users(:one) 
    sign_in @user
  end

  test 'should get index' do
    get bookings_url
    assert_response :success
  end

  test 'should get no bookings notice when user has no bookings' do
    get bookings_url
    assert_includes @response.body, 'You have no bookings.'
  end

  test 'should get formatted bookings when user has bookings' do
    booking = bookings(:one) 
    get bookings_url
    assert_includes @response.body, booking.id
  end

  test 'should create booking' do
    assert_difference('Booking.count') do
      post bookings_create_booking_url, params: { booking: { flight_id: flights(:one).id } }
    end

    assert_response :created
  end

end
