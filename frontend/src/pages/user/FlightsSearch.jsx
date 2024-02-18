import { useState, useEffect } from "react";
import {
  flightsApi,
  indexedFlightsApi,
  indexedRoutesApi,
} from "../../lib/flightsapi";
import FlightSearchOrigin from "../../components/flightsearchorigin";
import FlightSearchDestination from "../../components/flightsearchdestination";
import format from "date-fns/format";
import { useNavigate } from "react-router-dom";
import { AirplaneIcon } from "../../components/icons/icons"
// eslint-disable-next-line react/prop-types
const FlightsSearchComponent = ({ addAlert }) => {
  const [origin_location, setOrigin_location] = useState("");
  const [destination_location, setDestination_location] = useState("");
  const [departure_date, setDeparture_date] = useState("");
  const [flights, setFlights] = useState([]);
  const [initialLoadFlights, setInitialLoadFlights] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [originOptions, setOriginOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [passengers, setPassengers] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('updatedSeatDataArray');
    const fetchData = async () => {
      try {
        const flightsData = await indexedFlightsApi();
        const routesData = await indexedRoutesApi();
        setInitialLoadFlights(flightsData);
        setIsInitialLoad(true);
        const uniqueOriginLocations = Array.from(
          new Set(routesData.map((route) => route.origin_location))
        );
        setOriginOptions(uniqueOriginLocations);
        const uniqueDestinationLocations = Array.from(
          new Set(routesData.map((route) => route.destination_location))
        );
        setDestinationOptions(uniqueDestinationLocations);
      } catch (error) {
        console.error("Error fetching initial flight information:", error);
        addAlert("Error fetching flights. Please try again.");
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!passengers) {
      addAlert("error", "Please select the number of passengers.");
      return;
    }
    setFlights("");
    try {
      const res = await flightsApi({
        origin_location,
        destination_location,
        departure_date,
        passengers,
      });

      console.log("Retrieved flight information: ", res);

      if (res.length === 0) {
        addAlert(
          "error",
          "No available flights on that date or location, please try again."
        );
      } else {
        setFlights(res);
        setIsInitialLoad(false);
        addAlert("success", "Flight search successful!");
      }
    } catch (error) {
      console.error(
        "Error retrieving flight information:",
        error.response.data
      );
      addAlert("error", error.response.data.error);
    }
  };

  const handleOriginSelect = (selectedOption) => {
    setOrigin_location(selectedOption);
  };

  const handleDestinationSelect = (selectedOption) => {
    setDestination_location(selectedOption);
  };

  const handleSelect = (flight_id) => {
    console.log("Flight ID:", flight_id);
    localStorage.setItem("selected_flight_id", flight_id);
    localStorage.setItem("total", passengers);
    navigate("/user/bookings/create_booking");
  };

  return (
    <>
      <div className="flex justify-center gap-5 shadow-xl my-4">
        <div className="flex justify-center gap-5">
          <label className="form-control max-w-xs">
            <div className="label">
              <span className="label-text">Passengers</span>
            </div>
            <select
              className="select select-bordered text-center"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
            >
              <option disabled value="" selected>
                Pick one
              </option>
              {[...Array(10)].map((_, index) => (
                <option key={index + 1}>{index + 1}</option>
              ))}
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Origin</span>
            </div>
            <FlightSearchOrigin
              originOptions={originOptions}
              onSelect={handleOriginSelect}
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Destination</span>
            </div>
            <FlightSearchDestination
              destinationOptions={destinationOptions}
              onSelect={handleDestinationSelect}
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Date</span>
            </div>
            <input
              className="input input-bordered w-full max-w-xs"
              type="date"
              value={departure_date}
              onChange={(e) => setDeparture_date(e.target.value)}
            />
          </label>

          <div className="card-actions justify-center my-6">
            <button
              onClick={handleSearch}
              type="submit"
              className="btn btn-primary"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* {isInitialLoad && initialLoadFlights.length >= 0 && (
        <div className="overflow-x-auto mt-4">
          <table className="table table-zebra table-pin-cols text-center">
            <thead>
              <tr className="text-black">
                <th>Flight Number</th>
                <th>Origin Location</th>
                <th>Departure Date</th>
                <th>Departure Location</th>
                <th>Arrival Date</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {initialLoadFlights.map((flight) => (
                <tr className="hover" key={flight.flight_number}>
                  <td>{flight.flights.flight_number}</td>
                  <td>{flight.routes.origin_location}</td>
                  <td>
                    {format(
                      new Date(flight.flights.departure_date),
                      "MMMM dd, yyyy hh:mm a"
                    )}
                  </td>
                  <td>{flight.routes.destination_location}</td>
                  <td>
                    {format(
                      new Date(flight.flights.arrival_date),
                      "MMMM dd, yyyy hh:mm a"
                    )}
                  </td>
                  <td>₱ {flight.routes.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} */}

    {!isInitialLoad && flights.length >= 1 && (    
    <div className="mt-5 rounded-md w-full flex justify-around gap-5 bg-primary">
      <div className="flex flex-col gap-3">
        {flights
        .sort((a, b) =>
          a.departure_date && b.departure_date
            ? a.departure_date.localeCompare(b.departure_date)
            : 0
        )
        .map((flight) => (
        <div key={flight.flight_number} className="flex gap-2 sm:gap-12 md:gap-24 lg:gap-36 xl:gap-44 p-5 px-7 rounded-lg shadow-md bg-white">
          <div>
            <div className="flex flex-col space-y-2">
                <span className="flex justify-center">
                  {format(new Date(flight.departure_date), "hh:mm a")}
                </span>
                <span className="flex justify-center font-bold">{flight.origin_location}</span>
                <span className="italic text-sm flex justify-center">{flight.origin_code}</span>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
              <div className="flex justify-center"></div>
              <div className="flex justify-center text-sm italic">FROM</div>
              <div className="flex justify-center"></div>
            </div>
          <div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex justify-center italic text-sm">
                {format(new Date(flight.departure_date), "MMMM dd, yyyy")}
              </div>
              <div className="flex justify-center"><AirplaneIcon /></div>
              <div className="flex justify-center">{flight.flight_number}</div>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
              <div className="flex justify-center"></div>
              <div className="flex justify-center text-sm italic">TO</div>
              <div className="flex justify-center"></div>
            </div>
          <div className="flex flex-col space-y-2">
                <span className="flex justify-center">
                  {format(new Date(flight.arrival_date), "hh:mm a")}
                </span>
                <span className="flex justify-center font-bold">
                  {flight.destination_location}
                </span>
                <span className="italic text-sm flex justify-center">
                {flight.destination_code}
                </span>
            </div>
          <div>
            <div className="flex flex-col space-y-4 ">
              <div className="flex"></div>
              <div className="flex">
                <button 
                 className="btn btn-accent"
                 onClick={() => handleSelect(flight.flight_id)}
                >
                  Select
                </button>
              </div>
              <div className="flex"></div>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
    )}
    </>
  );
};

export default FlightsSearchComponent;
