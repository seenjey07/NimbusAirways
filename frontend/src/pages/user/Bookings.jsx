import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  indexBookingsApi,
  showBookingApi,
  updateBookingApi,
} from "../../lib/bookingsapi";
import format from "date-fns/format";

const OpenBookingDetailsButton = ({ onOpenBookingDetails }) => {
  return <button onClick={onOpenBookingDetails}>Show</button>;
};

const UpdateBookingButton = ({ onUpdateBooking }) => {
  return <button onClick={onUpdateBooking}>Update</button>;
};

const BookingsComponent = ({ addAlert }) => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await indexBookingsApi();
        console.log("User Bookings API response:", res.data);
        setBookings(res.data);
      } catch (error) {
        console.error("Error retrieving bookings:", error);
        addAlert("error", "Error retrieving your bookings. Please try again.");
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

  const handleCreateBooking = () => {
    navigate("/user/flight_search");
  };

  // const handleCreateBooking = async () => {
  //   try {
  //     const bookingData = {
  //       is_confirmed: bookings.is_confirmed,
  //       confirmation_date: bookings.confirmation_date,
  //       booking_reference: bookings.booking_reference,
  //     };
  //     console.log("Create Booking API data:", bookingData);

  //     const res = await createBookingApi();
  //     console.log("Create Booking API response:", res);
  //     alert("Booking created successfully");
  //   } catch (error) {
  //     console.error("Error creating booking:", error);
  //     throw error;
  //   }
  // };

  const handleUpdateBooking = async (booking_reference) => {
    try {
      const updatedData = { booking_params };
      const res = await updateBookingApi(booking_reference, updatedData);
      console.log("Update Booking API response:", res);
      addAlert("success", "Booking updated successfully.");
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  return (
    <div className="overflow-x-auto mt-1 w-full">
      {Array.isArray(bookings) && bookings.length > 0 ? (
        <table className="table table-zebra table-pin-cols text-center">
          <thead>
            <tr className="font-bold text-black">
              <th>Booking Reference</th>
              <th>Departure Location</th>
              <th>Departure Date</th>
              <th>Destination Location</th>
              <th>Arrival Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center text-xs">
            {bookings.map((booking) => (
              <tr className="hover" key={booking.id}>
                <td>{booking.booking_reference}</td>
                <td>{booking.origin_location}</td>
                <td>
                  {format(
                    new Date(booking.departure_date),
                    "MMMM dd, yyyy, hh:mm a"
                  )}
                </td>
                <td>{booking.destination_location}</td>
                <td>
                  {console.log("Arrival Date:", booking.arrival_date)}
                  {format(
                    new Date(booking.arrival_date),
                    "MMMM dd, yyyy, hh:mm a"
                  )}
                </td>
                <td className="dropdown dropdown-hover">
                  <div tabindex="0" role="button" className="btn text-xs m-1">
                    Options
                  </div>
                  <ul
                    tabindex="0"
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-content"
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
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="mt-10 flex items-start justify-center h-screen">
          <div className="card w-96 glass shadow-xl place-content-center">
            <div className="card-body items-center text-center">
              <h2 className="card-title">
                You currently have no bookings. Plan your next trip with us!
              </h2>
              <div className="label-text-alt link link-hover">
                <button
                  onClick={handleCreateBooking}
                  className="btn btn-warning"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsComponent;
