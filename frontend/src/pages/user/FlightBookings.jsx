import { useState } from "react";
import Navbar from "../../components/UserNavBar";
import { showCurrentUserApi } from "../../lib/usersapi";
import { showCurrentFlightApi } from "../../lib/flightsapi";
import { createUserBookingApi } from "../../lib/bookingsapi";
import { useEffect } from "react";
import PassengerForm from "../../components/PassengerForm";
import format from "date-fns/format";
import Loading from "../../components/Loading";

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
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const flight_id = localStorage.getItem("selected_flight_id");
  const passenger = localStorage.getItem("total");
  const passengersArray = Array.from(
    { length: parseInt(passenger) },
    (_, index) => index + 1
  );
  const [flight, setFlight] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const flightsData = await showCurrentFlightApi(flight_id);
        console.log("Flights data", flightsData);
        setFlight(flightsData);
        setDepartureDate(flightsData.departure_date);
        setArrivalDate(flightsData.arrival_date);
      } catch (error) {
        console.error("Error fetching initial flight information:", error);
        addAlert("Error fetching flights. Please try again.");
      }
    };

    fetchData();
  }, []);

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
    const bookingData = {
      booking: {
        flight_id: flight_id,
        total_passengers: passenger,
      },
      passengers: Array.from({ length: parseInt(passenger) }, () => ({
        first_name: firstName,
        last_name: lastName,
        birth_date: birthDate,
        gender: gender,
        is_discounted: isDiscounted,
        baggage_quantity: baggageQuantity,
      })),
      seats: seatData
        ? [
            {
              seat_number: seatData.slice(1),
              seat_letter: seatData.charAt(0),
              is_available: false,
            },
          ]
        : [],
    };

    try {
      await createUserBookingApi(bookingData);
      addAlert("success", "Booking created successfully");
    } catch (error) {
      addAlert("error", error.message || "Error creating booking");
    }
  };

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
          <div className="card shrink-0 w-full p-6 max-w-sm shadow-2xl bg-white sticky top-0">
            <h2 className="text-xl font-bold mb-2">Flight Details</h2>
            <div>
              <label>Flight Number:</label>
              <p>{flight.flight_number}</p>
            </div>

            <div>
              <label>Departure Date and Time:</label>
              <p>
                {departureDate
                  ? format(new Date(departureDate), "MMMM dd, yyyy hh:mm a")
                  : "Not available"}
              </p>
            </div>

            <div>
              <label>Estimated Arrival Date and Time:</label>
              <p>
                {arrivalDate
                  ? format(new Date(arrivalDate), "MMMM dd, yyyy hh:mm a")
                  : "Not available"}
              </p>
            </div>
            <div>
              <label>Aircraft</label>
              {flight.aircraft ? (
                <p>
                  {flight.aircraft.name} {flight.aircraft.model}
                </p>
              ) : (
                <Loading />
              )}
            </div>

            <div>
              <label>Price</label>
              <p>₱{flight.price}</p>
            </div>

            <div>Seat Fee</div>
            <div>Meals</div>
            <div>Baggage</div>
            <div>Total Fee</div>
          </div>
          <div className="flex flex-col gap-5">
            {passengersArray.map((passengerNumber) => (
              <PassengerForm
                key={passengerNumber}
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
                passengerNumber={passengerNumber}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightBookings;
