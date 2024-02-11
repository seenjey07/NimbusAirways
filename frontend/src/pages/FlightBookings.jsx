import { useState } from "react";
import Navbar from "../components/UserNavBar";
import { showCurrentUserApi } from "../lib/usersapi";
import { createUserBookingApi } from "../lib/bookingsapi";
import PassengerForm from "../components/PassengerForm"

// eslint-disable-next-line react/prop-types
const FlightBookings = ({ addAlert }) => {
  const [bookForMyself, setBookForMyself] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [baggageQuantity, setBaggageQuantity] = useState(0);
  const [seatData, setSeatData] = useState();

  const [originFlight, setOriginFlight] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [destinationFlight, setDestinationFlight] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");

  ///TEMPORARY CODE HERE ///
  const flightOptions = [
    {
      flight_id: "1",
      flight_number: "NA37",
      departure_date: "2024-02-03T07:00:00+00:00",
      arrival_date: "2024-02-03T08:30:00+00:00",
    },
    {
      flight_id: "2",
      flight_number: "NA38",
      departure_date: "2024-02-03T08:00:00+00:00",
      arrival_date: "2024-02-03T09:30:00+00:00",
    },
    {
      flight_id: "3",
      flight_number: "NA39",
      departure_date: "2024-02-03T09:00:00+00:00",
      arrival_date: "2024-02-03T10:30:00+00:00",
    },
    {
      flight_id: "4",
      flight_number: "NA310",
      departure_date: "2024-02-03T10:00:00+00:00",
      arrival_date: "2024-02-03T11:30:00+00:00",
    },
    {
      flight_id: "5",
      flight_number: "NA311",
      departure_date: "2024-02-03T11:00:00+00:00",
      arrival_date: "2024-02-03T12:30:00+00:00",
    },
    {
      flight_id: "6",
      flight_number: "NA312",
      departure_date: "2024-02-03T12:00:00+00:00",
      arrival_date: "2024-02-03T13:30:00+00:00",
    },
    {
      flight_id: "7",
      flight_number: "NA313",
      departure_date: "2024-02-03T13:00:00+00:00",
      arrival_date: "2024-02-03T14:30:00+00:00",
    },
  ];
  ///END OF TEMPORARY CODE HERE ///

  const handleBookForMyselfChange = async (e) => {
    setBookForMyself(e.target.checked);

    if (e.target.checked) {
      try {
        const response = await showCurrentUserApi();
        const userData = response.data;
        console.log("User data:", userData);
        setFirstName(userData.first_name || "");
        setMiddleName(userData.middle_name || "");
        setLastName(userData.last_name || "");
        setBirthDate(userData.birth_date || "");
        setGender(userData.gender || "");
        setIsDiscounted(userData.is_discounted || false);
        setBaggageQuantity(userData.baggage_quantity || 0);
      } catch (error) {
        console.error("Error fetching current user details:", error);
      }
    } else {
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setBirthDate("");
      setGender("");
      setIsDiscounted(false);
      setBaggageQuantity(0);
    }
  };

  const handleSubmit = async () => {
    const selectedFlight = flightOptions.find(
      (flight) => flight.flight_number === originFlight
    );
    const seatLetter = seatData.charAt(0);
    const seatNumber = seatData.slice(1);
    const bookingData = {
      booking: {
        flight_id: selectedFlight?.flight_id,
        total_passengers: 1,
      },
      passengers: [
        {
          first_name: firstName,
          last_name: lastName,
          birth_date: birthDate,
          gender: gender,
          is_discounted: isDiscounted,
          baggage_quantity: baggageQuantity,
        },
      ],
      seats: [
        {
          seat_number: seatNumber,
          seat_letter: seatLetter,
          is_available: false,
        },
      ],
    };

    try {
      await createUserBookingApi(bookingData);
      addAlert("success", "Booking created successfully");
    } catch (error) {
      addAlert("error", error.message || "Error creating booking");
    }
  };
  ///TEMPORARY CODE HERE ///
  const handleFlightChange = (selectedFlight) => {
    setOriginFlight(selectedFlight.flight_number);
    setDepartureDate(selectedFlight.departure_date);
    setDestinationFlight(selectedFlight.flight_number);
    setArrivalDate(selectedFlight.arrival_date);
  };
  ///END OF TEMPORARY CODE HERE ///

  const handleSeatSelect = (seatData) => {
    setSeatData(seatData);
    console.log("Setter Seat Data", seatData);
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content h-full flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full p-6 max-w-sm shadow-2xl bg-white">
            <h2 className="text-xl font-bold mb-2">Flight Details</h2>
            <div>
              <label>Flight Number:</label>
              <select
                id="originFlight"
                name="originFlight"
                value={originFlight}
                onChange={(e) =>
                  handleFlightChange(
                    flightOptions.find(
                      (flight) => flight.flight_number === e.target.value
                    )
                  )
                }
                className="border p-2 w-full"
              >
                <option value="">Select Flight</option>
                {flightOptions.map((flight) => (
                  <option
                    key={flight.flight_number}
                    value={flight.flight_number}
                  >
                    {flight.flight_number}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Departure Date and Time:</label>
              <input
                type="text"
                id="departureDate"
                name="departureDate"
                value={departureDate}
                readOnly
                className="border p-2 w-full"
                disabled
              />
            </div>

            <div>
              <label>Estimated Arrival Date and Time:</label>
            </div>
            <div>
              <label>Aircraft</label>
            </div>
            <div>Price</div>
            <div>Base Price</div>
            <div>Administrative Cost</div>
            <div>Seat Fee</div>
            <div>Meals</div>
          </div>

          <PassengerForm 
          bookForMyself={bookForMyself}
          handleBookForMyselfChange={handleBookForMyselfChange}
          firstName={firstName}
          setFirstName={setFirstName}
          middleName={middleName}
          setMiddleName={setMiddleName}
          lastName={lastName}
          setLastName={setLastName}
          birthDate={birthDate}
          setBirthDate={setBirthDate}
          gender={gender}
          setGender={setGender}
          isDiscounted={isDiscounted}
          setIsDiscounted={setIsDiscounted}
          baggageQuantity={baggageQuantity}
          setBaggageQuantity={setBaggageQuantity}
          seatData={seatData}
          handleSeatSelect={handleSeatSelect}
          handleSubmit={handleSubmit}
          addAlert={addAlert}
          />

        </div>
      </div>
    </>
  );
};

export default FlightBookings;
