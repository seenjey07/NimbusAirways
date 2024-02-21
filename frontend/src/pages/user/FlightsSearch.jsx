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
import { AirplaneIcon } from "../../components/icons/icons";
import { locationData } from "../../assets/Datas";
// eslint-disable-next-line react/prop-types
const FlightsSearchComponent = ({ addAlert }) => {
  const [locationAdData, setLocationAdData] = useState([]);
  const [origin_location, setOrigin_location] = useState("");
  const [destination_location, setDestination_location] = useState("");
  const [departure_date, setDeparture_date] = useState("");
  const [flights, setFlights] = useState([]);
  const [initialLoadFlights, setInitialLoadFlights] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [originOptions, setOriginOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [passengers, setPassengers] = useState("");
  const [mount, setMount] = useState(false);
  const [isBookNowClicked, setIsBookNowClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("updatedSeatDataArray");
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

        const lowercasedDestinationOptions = destinationOptions.map((dest) =>
          dest.trim().toLowerCase()
        );
        const filteredLocations = locationData.filter((location) => {
          const lowerCaseLocation = location.location.trim().toLowerCase();
          const included =
            lowercasedDestinationOptions.includes(lowerCaseLocation);
          return included;
        });
        const randomizedLocations = filteredLocations.sort(
          () => Math.random() - 0.5
        );
        setLocationAdData(randomizedLocations);
        setMount(true);
      } catch (error) {
        addAlert("Error fetching flights. Please try again.");
      }
    };

    fetchData();
  }, [mount]);

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
    localStorage.setItem("selected_flight_id", flight_id);
    localStorage.setItem("total", passengers);
    localStorage.removeItem("destination_from_homepage");
    navigate("/user/bookings/create_booking");
  };

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastFlight = currentPage * itemsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - itemsPerPage;
  const currentFlights = flights.slice(indexOfFirstFlight, indexOfLastFlight);

  const totalPages = Math.ceil(flights.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const getImageForLocation = (url) => {
    return `${url}`;
  };

  const handleBookNow = (destination) => {
    localStorage.setItem("destination_from_homepage", destination);
    setIsBookNowClicked(true);
  };

  return (
    <>
      <div className="flex justify-center gap-5 shadow-xl my-4 bg-white">
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
              isBookNowClicked={isBookNowClicked}
              setIsBookNowClicked={setIsBookNowClicked}
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

      {isInitialLoad && initialLoadFlights.length >= 0 && (
        <>
          <div className="flex justify-around">
            {locationAdData.slice(0, 3).map((locationInfo, index) => (
              <div
                key={index}
                className="card card-compact w-96 bg-white shadow-xl hover:shadow-primary duration-300 ease-in-out"
              >
                <figure>
                  <img
                    src={getImageForLocation(locationInfo.url)}
                    alt={locationInfo.name}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {locationInfo.location.toUpperCase()}
                    <div className="badge badge-secondary">Popular</div>
                  </h2>
                  <p>{locationInfo.ad}</p>
                  <div className="card-actions justify-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        handleBookNow(locationInfo.location);
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                        addAlert("success", `Destination set to ${locationInfo.location}.`);
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-around mt-3 ">
            {locationAdData.slice(3, 6).map((locationInfo, index) => (
              <div
                key={index}
                className="card card-compact w-96 bg-white shadow-xl hover:shadow-primary duration-300 ease-in-out"
              >
                <figure>
                  <img
                    src={getImageForLocation(locationInfo.url)}
                    alt={locationInfo.name}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {locationInfo.location.toUpperCase()}
                  </h2>
                  <p>{locationInfo.ad}</p>
                  <div className="card-actions justify-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        handleBookNow(locationInfo.location);
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                        addAlert("success", `Destination set to ${locationInfo.location}.`);
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-around mt-3 mb-3">
            {locationAdData.slice(6, 9).map((locationInfo, index) => (
              <div
                key={index}
                className="card card-compact w-96 bg-white shadow-xl hover:shadow-primary duration-300 ease-in-out"
              >
                <figure>
                  <img
                    src={getImageForLocation(locationInfo.url)}
                    alt={locationInfo.name}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {locationInfo.location.toUpperCase()}
                  </h2>
                  <p>{locationInfo.ad}</p>
                  <div className="card-actions justify-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        handleBookNow(locationInfo.location);
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                        addAlert("success", `Destination set to ${locationInfo.location}.`);
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {!isInitialLoad && flights.length >= 1 && (
        <div className="mt-5 rounded-md w-full flex justify-around gap-5">
          <div className="flex flex-col">
            <div className="flex flex-col gap-3">
              {currentFlights
                .sort((a, b) =>
                  a.departure_date && b.departure_date
                    ? a.departure_date.localeCompare(b.departure_date)
                    : 0
                )
                .map((flight) => (
                  <div
                    key={flight.flight_number}
                    className="flex gap-2 sm:gap-12 md:gap-24 lg:gap-36 xl:gap-44 p-5 px-7 rounded-lg shadow-md border border-accent bg-white"
                  >
                    <div>
                      <div className="flex flex-col space-y-2">
                        <span className="flex justify-center">
                          {format(new Date(flight.departure_date), "hh:mm a")}
                        </span>
                        <span className="flex justify-center font-bold">
                          {flight.origin_location}
                        </span>
                        <span className="italic text-sm flex justify-center">
                          {flight.origin_code}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center space-y-4">
                      <div className="flex justify-center"></div>
                      <div className="flex justify-center text-sm italic">
                        FROM
                      </div>
                      <div className="flex justify-center"></div>
                    </div>
                    <div>
                      <div className="flex flex-col justify-center space-y-4">
                        <div className="flex justify-center italic text-sm">
                          {format(
                            new Date(flight.departure_date),
                            "MMMM dd, yyyy"
                          )}
                        </div>
                        <div className="flex justify-center">
                          <AirplaneIcon />
                        </div>
                        <div className="flex justify-center">
                          {flight.flight_number}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center space-y-4">
                      <div className="flex justify-center"></div>
                      <div className="flex justify-center text-sm italic">
                        TO
                      </div>
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
                        <div className="flex flex-col justify-center">
                          <div className="mb-1">
                            <span className="text-sm mr-1 mb-1">Php</span>
                            {parseInt(flight.price).toFixed(2)}
                          </div>
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
            <div className="flex justify-center mt-1">
              <div className="join ">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    className={`btn join-item${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FlightsSearchComponent;
