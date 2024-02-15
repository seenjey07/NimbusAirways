/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import format from "date-fns/format";
// eslint-disable-next-line react/prop-types
const FlightsTableModal = ({ flightsData }) => {
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFlights, setFilteredFlights] = useState([]);

  useEffect(() => {
    const filtered = flightsData.filter(
      (flight) =>
        (flight.flight_number && flight.flight_number.includes(searchTerm)) ||
        (flight.route.origin_location &&
          flight.route.origin_location.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (flight.departure_date &&
          format(new Date(flight.departure_date), 'MMMM dd, yyyy HH:mm a').includes(searchTerm)) ||
        (flight.arrival_date &&
          format(new Date(flight.arrival_date), 'MMMM dd, yyyy HH:mm a').includes(searchTerm))
    );
  
    setFilteredFlights(filtered);
    setCurrentPage(1);
  }, [flightsData, searchTerm]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedFlightsData = filteredFlights.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredFlights.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="join border border-slate-900">
          <button 
          className="join-item btn bg-slate-200"
          onClick={handlePrevPage} 
          disabled={currentPage === 1}
          >
          «
          </button>
          <button 
          className="join-item btn bg-slate-500">
          {`Page ${currentPage} of ${totalPages}`}
          </button>
          <button 
          className="join-item btn bg-slate-200"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          >
          »
          </button>
        </div>

        <input 
        type="text" 
        placeholder="Search" 
        className="input input-bordered w-full max-w-xs bg-white" 
        value={searchTerm}
        onChange={handleSearchChange}
        />

      </div>


      <div>
        <table className="table text-black">
          <thead>
            <tr className="font-bold">
              <th className="text-center">Flight Number</th>
              <th className="text-center">Departure Location</th>
              <th className="text-center">Arrival Location</th>
              <th className="text-center">Departure Date</th>
              <th className="text-center">Arrival Date</th>
              <th className="text-center">Available Seats</th>
            </tr>
          </thead>
          <tbody>
            {slicedFlightsData.map((flight) => (
              <tr key={flight.id}>
                <td className="text-center">{flight.flight_number}</td>
                <td className="text-center">{flight.route.origin_location}</td>
                <td className="text-center">{flight.route.destination_location}</td>
                <td className="text-center">{format(new Date(flight.departure_date), 'MMMM dd, yyyy HH:mm a')}</td>
                <td className="text-center">{format(new Date(flight.arrival_date), 'MMMM dd, yyyy HH:mm a')}</td>
                <td className="text-center">{flight.available_seats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
  
  export default FlightsTableModal;