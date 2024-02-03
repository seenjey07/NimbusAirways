import { useState } from "react";
import { showCurrentUserApi } from "../lib/usersapi";
import { createUserBookingApi } from "../lib/bookingsapi";
import SeatSelection from "./Dashboard/SeatSelection";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
// eslint-disable-next-line react/prop-types
const FlightBookings = ({addAlert}) => {
    const [bookForMyself, setBookForMyself] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');
    const [isDiscounted, setIsDiscounted] = useState(false);
    const [baggageQuantity, setBaggageQuantity] = useState(0);

    const [originFlight, setOriginFlight] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [destinationFlight, setDestinationFlight] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');

    

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
            console.log('User data:', userData);
            setFirstName(userData.first_name || ''); 
            setMiddleName(userData.middle_name || '');
            setLastName(userData.last_name || '');
            setBirthDate(userData.birth_date || '');
            setGender(userData.gender || '');
            setIsDiscounted(userData.is_discounted || false);
            setBaggageQuantity(userData.baggage_quantity || 0);
          } catch (error) {
            console.error('Error fetching current user details:', error);
          }
        } else {
          setFirstName('');
          setMiddleName('');
          setLastName('');
          setBirthDate('');
          setGender('');
          setIsDiscounted(false);
          setBaggageQuantity(0);
        }
      };
    
      const handleSubmit = async () => {
        const bookingData = {
            flight_id: flightOptions.find((flight) => flight.flight_number === originFlight)?.flight_id,
            total_passengers: 1,
            booking: {
              passengers: [
                {
                  first_name: firstName,
                  middle_name: middleName,
                  last_name: lastName,
                  birth_date: birthDate,
                  gender: gender,
                  is_discounted: isDiscounted,
                  baggage_quantity: baggageQuantity,
                },
              ],
            },
          };
        console.log('flightid', bookingData.flight_id)
    
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
    
    return(
            <>
                     <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Flight Details</h2>
                        <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="originFlight">Flight Number:</label>
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
                                <option key={flight.flight_number} value={flight.flight_number}>
                                {flight.flight_number}
                                </option>
                            ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="departureDate">Departure Date:</label>
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
                        </div>
                    </div>


                    <div className="container mx-auto mt-8">
                    <div className="form-control">
                    <label className="label cursor-pointer">
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
                    </div>
                    <h1 className="text-3xl font-semibold mb-4">Flight Booking</h1>
                    <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Passenger Details</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                        <label htmlFor="firstName">First Name:</label>
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
                        <label htmlFor="middleName">Middle Name:</label>
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
                        <label htmlFor="lastName">Last Name:</label>
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
                        <label htmlFor="birthDate">Birth Date:</label>
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
                        <label htmlFor="gender">Gender:</label>
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
                        <div>
                        <label htmlFor="isDiscounted">Check if Senior or PWD</label>
                        <input
                            type="checkbox"
                            id="isDiscounted"
                            name="isDiscounted"
                            checked={isDiscounted}
                            onChange={(e) => setIsDiscounted(e.target.checked)}
                        />
                        </div>
                        <div>
                        <label htmlFor="baggageQuantity">Baggage Quantity:</label>
                        <input
                            type="number"
                            id="baggageQuantity"
                            name="baggageQuantity"
                            value={baggageQuantity}
                            onChange={(e) => setBaggageQuantity(parseInt(e.target.value))}
                            className="border p-2 w-full"
                        />
                        </div>
                    </div>
                    </div>
            
                    <div>
                        <button
                            onClick={handleSubmit}
                            className="btn btn-primary"
                        >
                            Book Flight
                        </button>
                    </div>
                </div>
               
                <Drawer>
                
                <DrawerTrigger asChild>
                    <button className="btn btn-primary">Open Seat Selection</button>
                </DrawerTrigger>
                  <DrawerContent>
                  <div className="bg-base-100">
                    <SeatSelection />
                    <DrawerFooter>
                      <DrawerClose asChild>
                        <button className="btn btn-primary">Cancel</button>
                      </DrawerClose>
                    </DrawerFooter>
                    </div>
                  </DrawerContent>
                  
                </Drawer>

                
            </>
    );
  };

export default FlightBookings;