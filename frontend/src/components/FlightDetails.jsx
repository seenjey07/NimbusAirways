import Loading from "./Loading";
import format from "date-fns/format";
import PaymentModal from "./PaymentModal";
import { useState, useEffect } from "react";
/* eslint-disable react/prop-types */
const FlightDetails = ({
  flight,
  departureDate,
  arrivalDate,
  handleFormSubmit,
  passengerStates,
  passenger,
  seatDataArray,
  addAlert,
}) => {
  const [isPaymentButtonDisabled, setIsPaymentButtonDisabled] = useState(true);
  const combinedData = seatDataArray.map((seat, index) => ({
    seat,
    passenger: passengerStates[index],
  }));

  useEffect(() => {
    const isAnySeatDataEmpty = seatDataArray.some(
      (seatData) => seatData === ""
    );
    const isAnyPassengerDataEmpty = passengerStates.some(
      (passenger) =>
        !passenger.firstName || !passenger.lastName || !passenger.birthDate
    );

    setIsPaymentButtonDisabled(isAnySeatDataEmpty || isAnyPassengerDataEmpty);
  }, [seatDataArray, passengerStates]);

  const handlePayment = () => {
    console.log(seatDataArray);
    const duplicateSeats = findDuplicateSeats(seatDataArray);

    if (duplicateSeats.length > 0) {
      const duplicateSeatNumbers = duplicateSeats.join(", ");
      addAlert(
        "error",
        `Seat ${duplicateSeatNumbers} are already selected. Please choose different seats for each passenger.`
      );
    } else {
      document.getElementById("payment").showModal();
    }
  };

  const findDuplicateSeats = (seats) => {
    const seatSet = new Set();
    const duplicateSeats = [];

    for (const seat of seats) {
      if (seatSet.has(seat)) {
        duplicateSeats.push(seat);
      }

      seatSet.add(seat);
    }

    return duplicateSeats;
  };

  return (
    <>
      <dialog id="payment" className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-white">
          <PaymentModal
            handleFormSubmit={handleFormSubmit}
            passengerStates={passengerStates}
          />

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <h2 className="text-xl font-bold mb-2 flex justify-center">
        Booking Details
      </h2>
      <table>
        <tbody>
          <tr>
            <td className="font-bold text-right">Flight Number</td>
            <td className="flex ml-3">{flight.flight_number}</td>
          </tr>
          <tr>
            <td className="font-bold text-right">Departure Date and Time</td>
            <td className="flex ml-3">
              {departureDate
                ? format(new Date(departureDate), "MMMM dd, yyyy hh:mm a")
                : "Not available"}
            </td>
          </tr>
          <tr>
            <td className="font-bold text-right">
              Estimated Arrival Date and Time
            </td>
            <td className="flex ml-3">
              {arrivalDate
                ? format(new Date(arrivalDate), "MMMM dd, yyyy hh:mm a")
                : "Not available"}
            </td>
          </tr>
          <tr>
            <td className="font-bold text-right">Aircraft</td>
            <td className="flex ml-3">
              {flight.aircraft ? (
                `${flight.aircraft.name} ${flight.aircraft.model}`
              ) : (
                <Loading />
              )}
            </td>
          </tr>
          <tr>
            <td className="font-bold text-right">Price</td>
            <td className="flex ml-3">
              ₱{(flight.price * passenger).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="divider"></div>

      <div>
        {combinedData.map(
          (data, index) =>
            data.seat &&
            data.passenger.firstName &&
            data.passenger.birthDate &&
            data.passenger.lastName && (
              <>
                <div key={index}>
                  <span className="flex justify-center font-bold text-lg">
                    Passenger {index + 1}
                  </span>
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="font-bold text-right">First Name</td>
                        <td className="flex ml-3">
                          {data.passenger.firstName}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-bold text-right">Middle Name</td>
                        <td className="flex ml-3">
                          {data.passenger.middleName}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-bold text-right">Last Name</td>
                        <td className="flex ml-3">{data.passenger.lastName}</td>
                      </tr>
                      <tr>
                        <td className="font-bold text-right">Gender</td>
                        <td className="flex ml-3">{data.passenger.gender}</td>
                      </tr>
                      <tr>
                        <td className="font-bold text-right">Birthday</td>
                        <td className="flex ml-3">
                          {data.passenger.birthDate}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-bold text-right">Baggage</td>
                        <td className="flex ml-3">
                          {data.passenger.baggageQuantity}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-bold text-right">Seat</td>
                        <td className="flex ml-3">{data.seat}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="divider"></div>
              </>
            )
        )}
      </div>

      <div className="mb-1">
        <div className="font-bold">Seat Fee</div>
        <div className="font-bold">Meals</div>
        <div className="font-bold">Total Fee</div>
      </div>

      <div className="mt-2">
        <button
          onClick={handlePayment}
          className="btn btn-primary w-full"
          disabled={isPaymentButtonDisabled}
        >
          Payment
        </button>

        <p className="text-xs">
          *Please fill out all fields including seats in order to proceed.
        </p>
        <p className="text-xs">
          *Please double check the details before proceeding.
        </p>
      </div>
    </>
  );
};

export default FlightDetails;
