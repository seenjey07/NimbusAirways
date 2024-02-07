import { useState } from "react";
import Navbar from "../components/UserNavBar";
import { showCurrentUserApi } from "../lib/usersapi";
import { createUserBookingApi } from "../lib/bookingsapi";
import SeatSelection from "./Dashboard/SeatSelection";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "../components/ui/drawer";
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
          <div className="card shrink-0 w-full p-6 max-w-sm shadow-2xl bg-base-100">
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

          <div className="hero-content card flex flex-col lg:text-left bg-base-100">
            <h1 className="text-3xl font-bold mb-4">Flight Booking</h1>
            <h2 className="text-xl font-semibold mb-2">Passenger Details</h2>
            <label className="label cursor-pointer flex-1 w-full">
              <div className="flex">
                <div>
                  <span className="label-text mr-3">Book for yourself?</span>
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="toggle"
                    name="bookForMyself"
                    checked={bookForMyself}
                    onChange={handleBookForMyselfChange}
                  />
                </div>
              </div>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div>
                <label>Middle Name</label>
                <input
                  type="text"
                  id="middleName"
                  name="middleName"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label>Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div>
                <label>Birth Date</label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div>
                <label>Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="border p-2 w-full"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="flex place-items-center justify-center ">
                <div className="flex justify-center items-center">
                  <input
                    type="checkbox"
                    id="isDiscounted"
                    name="isDiscounted"
                    checked={isDiscounted}
                    onChange={(e) => setIsDiscounted(e.target.checked)}
                    className="mr-3"
                  />
                  <label>PWD or Senior Citizen?</label>
                </div>
              </div>
              <div>
                <label>Baggage Quantity:</label>
                <input
                  type="number"
                  id="baggageQuantity"
                  name="baggageQuantity"
                  value={baggageQuantity}
                  onChange={(e) => setBaggageQuantity(parseInt(e.target.value))}
                  className="border p-2 w-full"
                />
              </div>
              <div className="flex place-items-center justify-center">
                <Drawer>
                  <DrawerTrigger asChild>
                    <button className="btn btn-primary">
                      Open Seat Selection
                    </button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="bg-base-100">
                      <SeatSelection
                        addAlert={addAlert}
                        onSeatSelect={handleSeatSelect}
                      />
                      <DrawerFooter>
                        <DrawerClose asChild>
                          <button className="btn btn-primary">Cancel</button>
                        </DrawerClose>
                      </DrawerFooter>
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
            <div>
              <button onClick={handleSubmit} className="btn btn-primary">
                Book Flight
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightBookings;
