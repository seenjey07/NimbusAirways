import { useState, useEffect } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { indexBookingsApi, showBookingApi } from "../../lib/bookingsapi";
import { AirplaneIcon } from "../../components/icons/icons";
import format from "date-fns/format";
import Loading from "../../components/Loading";
import UserBookingDetailsModal from "../../pages/admin/dashboard/modals/UserBookingDetailsModal";

// eslint-disable-next-line react/prop-types
const BookingsComponent = ({ addAlert }) => {
  const [bookings, setBookings] = useState([]);
  const [bookingData, setBookingData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isUserBookingDetailsModalOpen, setIsUserBookingDetailsModalOpen] =
    useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await indexBookingsApi();
        setBookings(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        addAlert("error", "Error retrieving your bookings. Please try again.");
      }
    };

    fetchBookings();
  }, []);
  // eslint-disable-next-line react/prop-types
  const BookingDetailsButton = ({ onOpenBookingDetails }) => {
    return (
      <button
        className="btn btn-primary flex justify-center"
        onClick={() => {
          onOpenBookingDetails();
          setIsUserBookingDetailsModalOpen(true);
        }}
      >
        Show Details
      </button>
    );
  };

  const handleCreateBooking = () => {
    navigate("/user/flight_search");
  };

  const handleOpenBookingDetails = async (id) => {
    try {
      const res = await showBookingApi(id);
      setBookingData(res);
      setIsUserBookingDetailsModalOpen(true);
      document.getElementById("bookings").showModal();
    } catch (error) {
      addAlert("error", "Error showing booking details. Please try again.");
    }
  };

  const handleIsUserBookingDetailsModalOpen = () => {
    setIsUserBookingDetailsModalOpen(false);
  };

  return (
    <>
      <dialog id="bookings" className="modal">
        <UserBookingDetailsModal
          bookingData={bookingData}
          handleIsUserBookingDetailsModalOpen={
            handleIsUserBookingDetailsModalOpen
          }
          setIsUserBookingDetailsModalOpen={setIsUserBookingDetailsModalOpen}
          isUserBookingDetailsModalOpen={isUserBookingDetailsModalOpen}
        />
      </dialog>

      {loading ? (
        <Loading />
      ) : Array.isArray(bookings) && bookings.length > 0 ? (
        <div className="m-5 rounded-md flex justify-around gap-5 h-auto">
          <div className="flex flex-col">
            <div className="flex flex-col gap-3">
              {bookings
                .sort((a, b) =>
                  a.departure_date && b.departure_date
                    ? a.departure_date.localeCompare(b.departure_date)
                    : 0
                )
                .map((booking) => (
                  <div
                    key={booking.id}
                    className="flex gap-2 sm:gap-12 md:gap-24 lg:gap-36 xl:gap-44 p-5 px-7 rounded-lg shadow-md border border-accent bg-white text-center"
                  >
                    <div>
                      <div className="flex flex-col justify-center space-y-4">
                        <div className="flex justify-center italic text-sm">
                          {format(
                            new Date(booking.departure_date),
                            "MMMM dd, yyyy"
                          )}
                        </div>
                        <div className="flex justify-center">
                          <AirplaneIcon />
                        </div>
                        <div className="flex justify-center">
                          {booking.booking_reference}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center space-y-3">
                      <div className="flex justify-center"></div>
                      <div className="flex justify-center text-sm italic">
                        FROM
                      </div>
                      <div className="flex justify-center"></div>
                    </div>

                    <div>
                      <div className="flex flex-col space-y-2">
                        <span className="flex justify-center">
                          {format(new Date(booking.departure_date), "hh:mma")}
                        </span>
                        <span className="flex justify-center font-bold">
                          {booking.origin_location}
                        </span>
                        <span className="italic text-sm flex justify-center">
                          {booking.origin_code}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center space-y-3">
                      <div className="flex justify-center"></div>
                      <div className="flex justify-center text-sm italic">
                        TO
                      </div>
                      <div className="flex justify-center"></div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <span className="flex justify-center">
                        {format(new Date(booking.arrival_date), "hh:mma")}
                      </span>
                      <span className="flex justify-center font-bold">
                        {booking.destination_location}
                      </span>
                      <span className="italic text-sm flex justify-center">
                        {booking.destination_code}
                      </span>
                    </div>
                    <div>
                      <div className="flex flex-col space-y-3">
                        <div></div>
                        <div className="text-sm p-1 text-center">
                          <BookingDetailsButton
                            onOpenBookingDetails={() =>
                              handleOpenBookingDetails(booking.id)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
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
    </>

    // <div className="overflow-x-auto mt-1 w-full">
    // {Array.isArray(bookings) && bookings.length > 0 ?
    //     <table className="table table-zebra table-pin-cols text-center">
    //       <thead>
    //         <tr className="font-bold text-black">
    //           <th>Booking Reference</th>
    //           <th>Departure Location</th>
    //           <th>Departure Date</th>
    //           <th>Destination</th>
    //           <th>Arrival Date</th>
    //           <th>Actions</th>
    //         </tr>
    //       </thead>
    //       <tbody className="text-center text-sm">
    //         {bookings.map((booking) => (
    //           <tr className="hover:bg-info" key={booking.id}>
    //             <td>{booking.booking_reference}</td>
    //             <td>{booking.origin_location}</td>
    //             <td>
    //               {format(
    //                 new Date(booking.departure_date),
    //                 "MMMM dd, yyyy, hh:mm a"
    //               )}
    //             </td>
    //             <td>{booking.destination_location}</td>
    //             <td>
    //               {console.log("Arrival Date:", booking.arrival_date)}
    //               {format(
    //                 new Date(booking.arrival_date),
    //                 "MMMM dd, yyyy, hh:mm a"
    //               )}
    //             </td>
    //             <td className="link text-sm p-1">
    //               <a className="link link-hover pr-2">
    //                 <OpenBookingDetailsButton
    //                   onOpenBookingDetails={() =>
    //                     handleOpenBookingDetails(booking.booking_reference)
    //                   }
    //                 />
    //               </a>
    //               |
    //               <a className="link link-hover pl-2">
    //                 <UpdateBookingButton
    //                   onUpdateBooking={() =>
    //                     handleUpdateBooking(booking.booking_reference)
    //                   }
    //                 />
    //               </a>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   ) : (
    //     <div className="mt-10 flex items-start justify-center h-screen">
    //       <div className="card w-96 glass shadow-xl place-content-center">
    //         <div className="card-body items-center text-center">
    //           <h2 className="card-title">
    //             You currently have no bookings. Plan your next trip with us!
    //           </h2>
    //           <div className="label-text-alt link link-hover">
    //             <button
    //               onClick={handleCreateBooking}
    //               className="btn btn-warning"
    //             >
    //               Create
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
};

export default BookingsComponent;
