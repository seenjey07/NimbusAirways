import "../App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./home/navbar";
import { flightsApi, indexFlightsApi } from "../lib/flightsapi";
import Footer from "./home/footer";

const FlightsSearchComponent = () => {
  const [origin_location, setOrigin_location] = useState("");
  const [destination_location, setDestination_location] = useState("");
  const [departure_date, setDeparture_date] = useState("");
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const [initialLoadFlights, setInitialLoadFlights] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const flightsData = await indexFlightsApi();
        setInitialLoadFlights(flightsData);
        setIsInitialLoad(true);
      } catch (error) {
        console.error("Error fetching initial flight information:", error);
        setError("Error fetching flights. Please try again.");
      }
    };

    fetchData();
  }, []);

  console.log("initialLoadFlights:", initialLoadFlights);
  console.log("isInitialLoad:", isInitialLoad);

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const res = await flightsApi({
        origin_location,
        destination_location,
        departure_date,
      });
      console.log("Retrieved flight information: ", res);
      setFlights(res);
      setIsInitialLoad(false);
      setError(null);
    } catch (error) {
      console.error("Error retrieving flight information:", error);
      setError("Error searching for flights. Please try again.");
    }
  };

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="flex justify-center gap-5 shadow-xl my-4">
        <div className="flex justify-center gap-5">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Origin Location:</span>
            </div>
            <input
              className="input input-bordered w-full max-w-xs"
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
              className="input input-bordered w-full max-w-xs"
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

          {error && (
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="strokeCurrent shrink-0 h-2 w-2"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-white">{error}</span>
            </div>
          )}
        </div>
      </div>

      {isInitialLoad && initialLoadFlights.length >= 0 && (
        <div className="overflow-x-auto mt-4">
          <table className="table table-zebra table-pin-cols">
            <thead>
              <tr>
                <th>Flight Number</th>
                <th>Origin Location</th>
                <th>Departure Date</th>
                <th>Departure Location</th>
                <th>Arrival Date</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {initialLoadFlights.map((flight) => (
                <tr className="hover" key={flight.flight_number}>
                  <td>{flight.flight_number}</td>
                  <td>{flight.origin_location}</td>
                  <td>{flight.departure_date}</td>
                  <td>{flight.destination_location}</td>
                  <td>{flight.arrival_date}</td>
                  <td>{flight.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!isInitialLoad && flights.length >= 1 && (
        <div className="overflow-x-auto mt-4">
          <table className="table table-zebra table-pin-cols">
            <thead>
              <tr>
                <th>Flight Number</th>
                <th>Origin Location</th>
                <th>Destination Location</th>
                <th>Departure Date</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {flights
                .sort((a, b) =>
                  a.departure_date && b.departure_date
                    ? a.departure_date.localeCompare(b.departure_date)
                    : 0
                )
                .map((flight) => (
                  <tr className="hover" key={flight.flight_number}>
                    <td>{flight.flight_number}</td>
                    <td>{flight.origin_location}</td>
                    <td>{flight.destination_location}</td>
                    <td>{flight.departure_date}</td>
                    <td>{flight.price}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      <div>
        <Footer />
      </div>
    </>
  );
};

export default FlightsSearchComponent;
