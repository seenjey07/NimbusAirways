/* eslint-disable no-unused-vars */
import { useState } from "react";
import { showCurrentFlightApi } from "../../lib/flightsapi";
import { createUserBookingApi } from "../../lib/bookingsapi";
import { useEffect } from "react";
import PassengerForm from "../../components/PassengerForm";
import FlightDetails from "../../components/FlightDetails";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const FlightBookings = ({ addAlert }) => {
  const [flight, setFlight] = useState({});
  const flight_id = localStorage.getItem("selected_flight_id");
  const passenger = localStorage.getItem("total");
  const passengersArray = Array.from(
    { length: parseInt(passenger) },
    (_, index) => index + 1
  );
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [loadingFlight, setLoadingFlight] = useState(true);
  const [seatData, setSeatData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const flightsData = await showCurrentFlightApi(flight_id);
        console.log("Flights data", flightsData);
        setFlight(flightsData);
        setDepartureDate(flightsData.departure_date);
        setArrivalDate(flightsData.arrival_date);
        setLoadingFlight(false);
      } catch (error) {
        console.error("Error fetching initial flight information:", error);
        addAlert("Error fetching flights. Please try again.");
        setLoadingFlight(false);
      }
    };

    fetchData();
  }, [flight_id, addAlert]);

  const initialPassengerState = {
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    isDiscounted: false,
    baggageQuantity: 0,
  };

  const [passengerStates, setPassengerStates] = useState(
    Array.from({ length: parseInt(passenger) }, () => ({
      ...initialPassengerState,
    }))
  );
  const [seatDataArray, setSeatDataArray] = useState(
    Array.from({ length: passenger }, () => "")
  );
  const handleFormSubmit = async (passengerFormDataArray) => {
    console.log("Passenger Form Data Array:", passengerFormDataArray);

    if (seatDataArray.some((seatData) => seatData === "")) {
      addAlert(
        "error",
        "Please fill out selected seat/s or fill out passenger fields."
      );
      return;
    }

    if (
      passengerFormDataArray.some((formData) =>
        Object.values(formData).some((value) => value === "")
      )
    ) {
      addAlert(
        "error",
        "Please fill out all required fields for all passengers."
      );
      return;
    }

    const seats = seatDataArray
      .map((seatData) =>
        seatData
          ? {
              seat_number: seatData.slice(1),
              seat_letter: seatData.charAt(0),
              is_available: false,
            }
          : null
      )
      .filter(Boolean);
    console.log("Seats", seats);

    const bookingData = {
      booking: {
        flight_id: flight_id,
        total_passengers: passenger,
      },
      passengers: passengerFormDataArray.map((formData) => ({
        first_name: formData.firstName,
        middle_name: formData.middleName,
        last_name: formData.lastName,
        birth_date: formData.birthDate,
        gender: formData.gender,
        is_discounted: formData.isDiscounted,
        baggage_quantity: formData.baggageQuantity,
      })),
      seats: seats,
    };

    try {
      await createUserBookingApi(bookingData);
      addAlert("success", "Booking created successfully");
      navigate("/user/bookings");
      localStorage.removeItem('updatedSeatDataArray');
      localStorage.removeItem('selected_flight_id');
      localStorage.removeItem('total');

    } catch (error) {
      addAlert("error", error.message || "Error creating booking");
    }
  };

  const handleSeatSelect = (seatData, passengerNumber) => {
    console.log("passenger number:", passengerNumber);
    console.log("seat data:", seatData);

    const parsedPassengerNumber = parseInt(passengerNumber, 10);

    if (!isNaN(parsedPassengerNumber)) {
      setSeatDataArray((prevSeatDataArray) => {
        const updatedSeatDataArray = [...prevSeatDataArray];
        updatedSeatDataArray[parsedPassengerNumber - 1] = seatData;

        console.log('Updated SeatDataArray:', updatedSeatDataArray);
        localStorage.setItem('updatedSeatDataArray', JSON.stringify(updatedSeatDataArray))

        return updatedSeatDataArray;
      });
    } else {
      console.error("Invalid passenger number:", passengerNumber);
    }
  };

  const handlePassengerFormInputChange = (
    passengerNumber,
    fieldName,
    value
  ) => {
    console.log("Passenger Number:", passengerNumber);
    console.log("Field Name:", fieldName);
    console.log("Value:", value);
    setPassengerStates((prevStates) => {
      const updatedPassengerStates = prevStates.map((prevState, index) => {
        if (index + 1 === passengerNumber) {
          return {
            ...prevState,
            [fieldName]: value,
          };
        }
        return prevState;
      });

      return updatedPassengerStates;
    });
  };

  return (
    <>
      <div className="bg-accent p-7 px-12 rounded-md">
        <div>
          <div className="card z-1 lg:card-side bg-purple-200 shadow-xl">
            {passengersArray.slice(0, 4).map((passengerNumber) => (
              <div key={passengerNumber} className="card-body p-12 rounded-md overflow-auto">
                <h2 className="text-xl font-semibold mb-2 justify-center flex">{`Passenger ${passengerNumber}`}</h2>
                <PassengerForm
                  key={passengerNumber}
                  formFields={[
                    { name: 'firstName', label: 'First Name', type: 'text', required: true },
                    { name: 'middleName', label: 'Middle Name', type: 'text', required: true },
                    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
                    { name: 'birthDate', label: 'Birth Date', type: 'date', required: true },
                    { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'], required: true },
                    { name: 'baggageQuantity', label: 'Baggage Quantity', type: 'select', options: [0, 1, 2], required: true },
                  ]}
                  addAlert={addAlert}
                  passengerNumber={passengerNumber} 
                  handleSeatSelect={(seatData, passengerNumber) => {
                    console.log('Seat Data Passenger Form FB:', seatData);
                    console.log('Passenger Number:', passengerNumber);
                    handleSeatSelect(passengerNumber, seatData);
                  }}
                  onInputChange={(field, value) => handlePassengerFormInputChange(passengerNumber, field, value)}
                />
              </div>
            ))}
          </div>

          <div className="card z-1 lg:card-side bg-purple-200 shadow-xl mt-4">
            {passengersArray.slice(4, 8).map((passengerNumber) => (
              <div key={passengerNumber} className="card-body p-12 rounded-md overflow-auto">
                <h2 className="text-xl font-semibold mb-2 justify-center flex">{`Passenger ${passengerNumber}`}</h2>
                <PassengerForm
                  key={passengerNumber}
                  formFields={[
                    { name: 'firstName', label: 'First Name', type: 'text', required: true },
                    { name: 'middleName', label: 'Middle Name', type: 'text', required: true },
                    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
                    { name: 'birthDate', label: 'Birth Date', type: 'date', required: true },
                    { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'], required: true },
                    { name: 'baggageQuantity', label: 'Baggage Quantity', type: 'select', options: [0, 1, 2], required: true },
                  ]}
                  addAlert={addAlert}
                  passengerNumber={passengerNumber} 
                  handleSeatSelect={(seatData, passengerNumber) => {
                    console.log('Seat Data Passenger Form FB:', seatData);
                    console.log('Passenger Number:', passengerNumber);
                    handleSeatSelect(passengerNumber, seatData);
                  }}
                  onInputChange={(field, value) => handlePassengerFormInputChange(passengerNumber, field, value)}
                />
              </div>
            ))}
          </div>

          <div className="card z-1 lg:card-side bg-purple-200 shadow-xl mt-4">
            {passengersArray.slice(8, 10).map((passengerNumber) => (
              <div key={passengerNumber} className="card-body p-12 rounded-md overflow-auto">
                <h2 className="text-xl font-semibold mb-2 justify-center flex">{`Passenger ${passengerNumber}`}</h2>
                <PassengerForm
                  key={passengerNumber}
                  formFields={[
                    { name: 'firstName', label: 'First Name', type: 'text', required: true },
                    { name: 'middleName', label: 'Middle Name', type: 'text', required: true },
                    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
                    { name: 'birthDate', label: 'Birth Date', type: 'date', required: true },
                    { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'], required: true },
                    { name: 'baggageQuantity', label: 'Baggage Quantity', type: 'select', options: [0, 1, 2], required: true },
                  ]}
                  addAlert={addAlert}
                  passengerNumber={passengerNumber} 
                  handleSeatSelect={(seatData, passengerNumber) => {
                    console.log('Seat Data Passenger Form FB:', seatData);
                    console.log('Passenger Number:', passengerNumber);
                    handleSeatSelect(passengerNumber, seatData);
                  }}
                  onInputChange={(field, value) => handlePassengerFormInputChange(passengerNumber, field, value)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 card-actions">
        <div className="drawer drawer-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex justify-center">
            <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">
              Flight Details
            </label>
          </div>
          <div className="drawer-side z-20">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="menu p-4 w-80 min-h-full bg-white text-base-content">
              <FlightDetails
                flight={flight}
                departureDate={departureDate}
                arrivalDate={arrivalDate}
                handleFormSubmit={handleFormSubmit}
                passengerStates={passengerStates}
                passenger={passenger}
                seatDataArray={seatDataArray}
                addAlert={addAlert}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightBookings;
