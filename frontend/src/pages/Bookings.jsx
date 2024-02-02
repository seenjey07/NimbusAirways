import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  indexBookingsApi,
  createBookingApi,
  showBookingApi,
  updateBookingApi,
  destroyBookingApi,
} from "../lib/bookingsapi";

const OpenBookingDetailsButton = ({ onOpenBookingDetails }) => {
  return <button onClick={onOpenBookingDetails}>Show</button>;
};

const UpdateBookingButton = ({ onUpdateBooking }) => {
  return <button onClick={onUpdateBooking}>Update</button>;
};

const DeleteBookingButton = ({ onDeleteBooking }) => {
  return <button onClick={onDeleteBooking}>Delete</button>;
};

const BookingsComponent = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await indexBookingsApi();
        setBookings(res);
        setError(null);
      } catch (error) {
        console.error("Error retrieving bookings:", error);
        setError("Error fetching bookings. Please try again.");
      }
    };

    fetchBookings();
  }, []);

  const handleOpenBookingDetails = async (booking_reference) => {
    try {
      const res = await showBookingApi(booking_reference);
      console.log("Show Booking API response:", res);
      navigate(`/bookings/${booking_reference}`);
    } catch (error) {
      console.error("Error showing booking details:", error);
    }
  };

  const handleCreateBooking = async () => {
    try {
      const res = await createBookingApi();
      console.log("Create Booking API response:", res);
      notice("Booking created successfully");
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  };

  const handleUpdateBooking = async (booking_reference) => {
    try {
      const updatedData = { booking_params };
      const res = await updateBookingApi(booking_reference, updatedData);
      console.log("Update Booking API response:", res);
      notice("Booking updated successfully");
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleDeleteBooking = async (booking_reference) => {
    try {
      const res = await destroyBookingApi(booking_reference);
      console.log("Delete Booking API response:", res);
      notice("Booking deleted successfully");
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <div>
      <h4>Your Bookings</h4>
      {bookings.length === 0 ? (
        <p>You currently have no bookings. Plan your next trip with us!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Booking Reference</th>
              <th>Origin Location</th>
              <th>Destination Location</th>
              <th>Date of Departure</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.booking_reference}</td>
                <td>{booking.flight.origin_location}</td>
                <td>{booking.flight.destination_location}</td>
                <td>{booking.route.date_of_departure}</td>
                <td>
                  <OpenBookingDetailsButton
                    onOpenBookingDetails={() =>
                      handleOpenBookingDetails(booking.booking_reference)
                    }
                  />
                  <UpdateBookingButton
                    onUpdateBooking={() =>
                      handleUpdateBooking(booking.booking_reference)
                    }
                  />
                  <DeleteBookingButton
                    onDeleteBooking={() =>
                      handleDeleteBooking(booking.booking_reference)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {error && (
        <div role="alert" className="alert alert-error">
          <span className="text-red-500">{error}</span>
        </div>
      )}
    </div>
  );
};

export default BookingsComponent;
