import { useState, useEffect } from "react";
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
      const bookingData = {
        is_confirmed: bookings.is_confirmed,
        confirmation_date: bookings.confirmation_date,
        booking_reference: bookings.booking_reference,
      };
      console.log("Create Booking API data:", bookingData);

      const res = await createBookingApi();
      console.log("Create Booking API response:", res);
      alert("Booking created successfully");
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
      alert("Booking updated successfully");
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleDeleteBooking = async (booking_reference) => {
    try {
      const res = await destroyBookingApi(booking_reference);
      console.log("Delete Booking API response:", res);
      alert("Booking deleted successfully");
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };


  const onCreateBooking = () => {
    navigate('/bookings/create');
  }
  return (
    <div>
    {bookings.length !== 0 ? (
      <div className="flex items-center justify-center h-screen">
        <div className="card w-96 glass shadow-xl place-content-center">
          <div className="card-body items-center text-center">
            <h2 className="card-title">
              You currently have no bookings. Plan your next trip with us!
            </h2>
            <div className="label-text-alt link link-hover btn btn-warning">
              <button onClick={onCreateBooking}>Book a flight</button>
            </div>
          </div>
        </div>
      </div>
  ) : (
    <div className="overflow-x-auto">
      <table className="table table-zebra table-pin-cols">
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
            <tr className="hover" key={booking.id}>
              <td>{booking.booking_reference}</td>
              <td>{booking.flight.origin_location}</td>
              <td>{booking.flight.destination_location}</td>
              <td>{booking.route.date_of_departure}</td>
              <td className="dropdown dropdown-hover">
                <div tabIndex="0" role="button" className="btn m-1">
                  Options
                </div>
                <ul
                  tabIndex="0"
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
                    <OpenBookingDetailsButton
                      onOpenBookingDetails={() =>
                        handleOpenBookingDetails(booking.booking_reference)
                      }
                    />
                  </li>
                  <li className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
                    <UpdateBookingButton
                      onUpdateBooking={() =>
                        handleUpdateBooking(booking.booking_reference)
                      }
                    />
                  </li>
                  <li className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
                    <DeleteBookingButton
                      onDeleteBooking={() =>
                        handleDeleteBooking(booking.booking_reference)
                      }
                    />
                  </li>
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
