import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { flightsApi } from "../lib/flightsapi";

const FlightsSearchComponent = () => {
  const [origin_location, setOrigin_location] = useState("");
  const [destination_location, setDestination_location] = useState("");
  const [departure_date, setDeparture_date] = useState("");
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const res = await flightsApi();
      setFlights(res.data.flights);
      setError(null);
      navigate("/search_results");
    } catch (error) {
      console.error("Error retrieving flight information:", error);
      setError("Error searching for flights. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="flex justify-center gap-5 shadow-xl">
        <div className="flex justify-center gap-5">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Origin Location:</span>
            </div>
            <input
              class="input input-bordered w-full max-w-xs"
              type="text"
              placeholder="Type here"
              value={origin_location}
              onChange={(e) => setOrigin_location(e.target.value)}
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Destination:</span>
            </div>
            <input
              class="input input-bordered w-full max-w-xs"
              type="text"
              placeholder="Type here"
              value={destination_location}
              onChange={(e) => setDestination_location(e.target.value)}
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Date:</span>
            </div>
            <input
              class="input input-bordered w-full max-w-xs"
              type="date"
              value={departure_date}
              onChange={(e) => setDeparture_date(e.target.value)}
            />
          </label>

          <div className="card-actions justify-center my-6">
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>

          {flights.map((flight) => (
            <div key={flight.flight_number}>
              Flight from {flight.route.origin_location} to{" "}
              {flight.route.destination_location} on {flight.departure_date}
            </div>
          ))}

          {error && (
            <div role="alert" class="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="strokeCurrent shrink-0 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-red-500">{error}</span>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default FlightsSearchComponent;
