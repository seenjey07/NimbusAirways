import React, { useState, useEffect } from "react";
import format from "date-fns/format";
import Loading from "../../../../components/Loading";
// eslint-disable-next-line react/prop-types
const UserBookingDetailsModal = ({
  bookingData,
  isUserBookingDetailsModalOpen,
  setIsUserBookingDetailsModalOpen,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(bookingData);
    setIsUserBookingDetailsModalOpen(false);
  }, [isUserBookingDetailsModalOpen]);

  const handleClose = () => {
    document.getElementById("bookings").close();
    setIsUserBookingDetailsModalOpen(false);
  };

  return (
    <>
      <dialog
        className="card-body h-content w-content bg-secondary text-sm rounded-xl"
        style={{
          position: "fixed",
          maxWidth: "45%",
          maxBlockSize: "100%",
          margin: "auto",
          padding: "10px",
        }}
      >
        <h2 className="flex justify-center text-center font-serif text-lg font-bold m-0 p-0">
          Booking Reference:
        </h2>
        <p className="flex justify-center text-center text-2xl font-bold mt-0 mb-1">
          {data?.data?.booking?.booking_reference}
        </p>

        {data?.data?.booking && data?.data?.booking?.flight && (
          <div className="justify-center flex border-2 rounded">
            <div>
              <p className="justify-center flex underline underline-offset-1 font-bold py-2">
                Flight Details
              </p>
              <table>
                <tbody>
                  <tr className="border-2 border-black">
                    <td className="font-bold text-xs pl-1 text-start">
                      Flight No.:
                    </td>
                    <td className="flex ml-3 border-2 bg-white text-start">
                      {data?.data?.booking.flight?.flight_number}
                    </td>
                  </tr>

                  <tr className="border-2 border-black">
                    <td className="font-bold text-xs pl-1 text-start">
                      Origin:
                    </td>
                    <td className="flex ml-3 bg-base-100 text-start">
                      {data?.data?.route?.origin_location}
                      <span className="italic ml-1 text-sm font-bold">
                        ({data?.data?.route?.origin_code})
                      </span>
                    </td>
                  </tr>

                  <tr className="border-2 border-black">
                    <td className="font-bold text-xs pl-1 text-start">
                      Departure:
                    </td>
                    <td className="flex ml-3 border-2 bg-white text-start">
                      {format(
                        data?.data?.booking?.flight?.departure_date,
                        "MMM dd, yyyy hh:mma"
                      )}
                    </td>
                  </tr>

                  <tr className="border-2 border-black">
                    <td className="font-bold text-xs pl-1 text-start">
                      Destination:
                    </td>
                    <td className="flex ml-3 text-start bg-base-100">
                      {data?.data?.route?.destination_location}
                      <span className="italic text-sm font-bold">
                        ({data?.data?.route?.destination_code})
                      </span>
                    </td>
                  </tr>

                  <tr className="border-2 border-black">
                    <td className="font-bold text-xs pl-1 text-start">
                      Arrival:
                    </td>
                    <td className="flex ml-3 border-2 bg-white text-start">
                      {format(
                        data?.data?.booking.flight?.arrival_date,
                        "MMM dd, yyyy hh:mma"
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="justify-center border-l-2">
              <p className="justify-center text-center underline underline-offset-1 font-bold py-2">
                Aircraft Details
              </p>
              <table>
                <tbody>
                  <tr className="border-2 border-black">
                    <td className="font-bold text-xs pl-1 text-start">
                      Family:
                    </td>
                    <td className="flex ml-3 border-2 bg-white text-start">
                      {data?.data?.booking.flight.aircraft?.family}
                    </td>
                  </tr>

                  <tr className="border-2 border-black">
                    <td className="font-bold text-xs pl-1 text-start">
                      Model:
                    </td>
                    <td className="flex ml-3 text-start bg-base-100">
                      {data?.data?.booking.flight.aircraft?.model}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="flex-1 h-auto rounded w-full">
          <div className="flex">
            {data?.data?.passengers &&
              data?.data?.passengers.slice(0, 5).map((passenger, index) => (
                <div
                  className="flex-col justify-center items-center text-center collapse border-black rounded-lg shadow-lg  bg-white ease-in-out duration-300 focus:bg-slate-200"
                  key={passenger.id}
                >
                  {" "}
                  <input
                    type="radio"
                    name="my-accordion-1"
                    id={`passenger-${index}`}
                  />
                  <label
                    htmlFor={`passenger-${index}`}
                    className="collapse-title text-md h- pr-3 font-bold underline underline-offset-2"
                  >
                    Passenger {index + 1}
                  </label>
                  <div className="collapse-content p-2">
                    <table>
                      <tbody>
                        <tr className="border-2 border-black">
                          <td className="font-bold text-xs pl-1 text-start">
                            First Name:
                          </td>
                          <td className="flex ml-3 text-start border-2 bg-base-100">
                            {passenger?.first_name}
                          </td>
                        </tr>

                        <tr className="border-2 border-black">
                          <td className="font-bold text-xs pl-1 text-start">
                            Middle Name:
                          </td>
                          <td className="flex ml-3 border-2 bg-white text-start">
                            {passenger?.middle_name}
                          </td>
                        </tr>

                        <tr className="border-2 border-black">
                          <td className="font-bold text-xs pl-1 text-start">
                            Last Name:
                          </td>
                          <td className="flex ml-3 text-start border-2 bg-base-100">
                            {passenger?.last_name}
                          </td>
                        </tr>

                        <tr className="border-2 border-black">
                          <td className="font-bold text-xs pl-1 text-start">
                            Birthday:
                          </td>
                          <td className="flex ml-3 border-2 bg-white text-start">
                            {format(passenger?.birth_date, "MMM dd,yyyy")}
                          </td>
                        </tr>

                        <tr className="border-2 border-black">
                          <td className="font-bold text-xs pl-1 text-start">
                            Gender:
                          </td>
                          <td className="flex ml-3 text-start border-2 bg-base-100">
                            {passenger?.gender}
                          </td>
                        </tr>

                        <tr className="border-2 border-black">
                          <td className="font-bold text-xs pl-1 text-start">
                            Seat:
                          </td>
                          <td className="flex ml-3 border-2 bg-white text-start">{`${passenger.seat.seat_number}${passenger.seat.seat_letter}`}</td>
                        </tr>

                        <tr className="border-2 border-black">
                          <td className="font-bold text-xs pl-1 text-start">
                            Luggage:
                          </td>
                          <td className="flex ml-3 border-2 text-start bg-base-100">{`${passenger.baggage_quantity}`}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex">
            {data?.data?.passengers &&
              data?.data?.passengers.slice(5, 10).map((passenger, index) => (
                <div
                  className="flex flex-col align-items-center justify-center collapse ease-in-out duration-300 focus:bg-slate-100"
                  key={passenger.id}
                >
                  {" "}
                  <input
                    type="radio"
                    name="my-accordion-1"
                    id={`passenger-${index}`}
                  />
                  <label
                    htmlFor={`passenger-${index}`}
                    className="collapse-title text-2xl font-bold underline underline-offset-2"
                  >
                    Passenger {index + 6}
                  </label>
                  <div className="collapse-content border-2 rounded-lg shadow-lg">
                    <table>
                      <tbody>
                        <tr>
                          <td className="font-bold text-right">First Name</td>
                          <td className="flex ml-3">{passenger?.first_name}</td>
                        </tr>

                        <tr>
                          <td className="font-bold text-right">Middle Name</td>
                          <td className="flex ml-3">
                            {passenger?.middle_name}
                          </td>
                        </tr>

                        <tr>
                          <td className="font-bold text-right">Last Name</td>
                          <td className="flex ml-3">{passenger?.last_name}</td>
                        </tr>

                        <tr>
                          <td className="font-bold text-right">Birthday</td>
                          <td className="flex ml-3 text-sm mt-1">
                            {format(passenger?.birth_date, "MMM dd, yyyy")}
                          </td>
                        </tr>

                        <tr>
                          <td className="font-bold text-right">Gender</td>
                          <td className="flex ml-3">{passenger?.gender}</td>
                        </tr>

                        <tr>
                          <td className="font-bold text-right">Seat</td>
                          <td className="flex ml-3">{`${passenger.seat.seat_number}${passenger.seat.seat_letter}`}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <button
          className="btn btn-error text-sm w-2/5 sm:w-1/5 self-center p-0 m-0 font-bold rounded-full"
          onClick={handleClose}
          type="button"
        >
          Close
        </button>
      </dialog>
    </>
  );
};

export default UserBookingDetailsModal;
