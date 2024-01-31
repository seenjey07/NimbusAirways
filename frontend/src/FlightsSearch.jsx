import React, { useState } from "react";
import axios from "axios";

const FlightSearchComponent = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [flights, setFlights] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get("/api/flights", {
        params: {
          departure: origin,
          destination: destination,
          date: date,
        },
      });

      setFlights(response.data.flights);
    } catch (error) {
      console.error("Error searching for flights:", error);
    }
  };

  return (
    <div>
      <label>
        Origin:
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
      </label>
      <label>
        Destination:
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </label>
      <label>
        Date:
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <button onClick={handleSearch}>Search Flights</button>

      {flights.map((flight) => (
        <div key={flight.id}>
          Flight from {flight.origin} to {flight.destination} on {flight.date}
        </div>
      ))}
    </div>
  );
};

export default FlightSearchComponent;
