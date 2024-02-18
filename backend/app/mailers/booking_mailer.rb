class BookingMailer < ApplicationMailer
  helper ApplicationHelper
  def booking_confirmation(booking)
    @booking = booking
    @passengers = booking.passengers
    mail(to: booking.user.email, subject: 'Booking Confirmation')
  end
end
