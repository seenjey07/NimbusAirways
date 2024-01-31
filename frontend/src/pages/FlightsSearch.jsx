const backendBaseUrl = "http://localhost:3000";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      const response = await axios.post("$(backendBaseUrl)/api/flights", {
        params: {
          origin_location,
          destination_location,
          departure_date,
        },
      });

      setFlights(response.data.flights);
      setError(null);
      navigate("/search_results");
    } catch (error) {
      console.error("Error searching for flights:", error);
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
            <div key={flight.id}>
              Flight from {flight.origin_location} to{" "}
              {flight.destination_location} on {flight.departure_date}
            </div>
          ))}

          {error && (
            <div role="alert" class="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
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
