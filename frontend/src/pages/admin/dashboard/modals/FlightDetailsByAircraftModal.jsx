import { adminFlightDetailsByAircraftApi } from "../../../../lib/admin/adminusersapi"
import { useState, useEffect } from "react";
import Loading from "../../../../components/Loading"
import { format } from "date-fns";
import SeatSelection from "../../../../pages/user/Dashboard/SeatSelection"
import { SeatIcon } from "../../../../components/icons/icons"
// eslint-disable-next-line react/prop-types
const FlightDetailsByAircraftModal = ({aircraftId}) => {
    const [flightData, setFlightData] = useState({
        aircraft: {},
        status: "",
        current_route: {},
        current_flights: [],
        all_flights: [],
      });
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const flightsPerPage = 6;
    const [modalFlag, setModalFlag] = useState(false)
    
    useEffect(() => {
        const fetchFlights = async () => {
          try {
            const response = await adminFlightDetailsByAircraftApi(aircraftId);
            setFlightData((prevFlightData) => ({
              ...prevFlightData,
              all_flights: response.all_flights,
              current_route: response.current_route,
              current_flights: response.current_flights,
              aircraft: response.aircraft
            }));
            setIsLoading(false);
          } catch (error) {
            setIsLoading(false);
            console.error("Error fetching flights:", error);
          }
        };
        fetchFlights();
      }, [aircraftId]);

      const handleSeatModalClose = () => {
        document.getElementById('seat').close()
        localStorage.removeItem('updatedSeatDataArray');
        localStorage.removeItem('selected_flight_id');
        localStorage.removeItem('total');
        setModalFlag(false)
      }

      const handleSeatModalOpen = (flight_id) => {
        localStorage.setItem("selected_flight_id", flight_id);
        document.getElementById('seat').showModal();
        setModalFlag(true)
      };

    const filteredFlights = flightData.all_flights.filter((flight) =>
    flight.flight_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flight.departure_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flight.arrival_date.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastFlight = currentPage * flightsPerPage;
    const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
    const currentFlights = filteredFlights.slice(indexOfFirstFlight, indexOfLastFlight);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="overflow-x-auto bg-white">
                    <div className="flex justify-between">
                        <div className="flex">
                        <input
                            type="text"
                            placeholder="Search by flight number or date"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="m-2 p-2 border border-gray-300 rounded placeholder:text-sm"
                        />
                        </div>
                        <div className="flex text-black mt-6 text-xl">
                        {flightData.current_route ? (
                            <>
                            {flightData.current_route.destination_location} to {flightData.current_route.origin_location} | {flightData.current_route.origin_location} to {flightData.current_route.destination_location}
                            </>
                        ) : (
                            "Not Assigned"
                        )}
                        </div>
                    </div>

                    {currentFlights.length > 0 ? (
                        <table className="table table-zebra">
                        <thead>
                            <tr>
                            <th className="text-black font-bold">No.</th>
                            <th className="text-black font-bold">Flight Number</th>
                            <th className="text-black font-bold">Departure</th>
                            <th className="text-black font-bold">Arrival</th>
                            <th className="text-black font-bold">Seats</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentFlights.map((flight, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{flight.flight_number}</td>
                                <td>{format(new Date(flight.departure_date), 'MMMM dd, yyyy hh:mm a')}</td>
                                <td>{format(new Date(flight.arrival_date), 'MMMM dd, yyyy hh:mm a')}</td>
                                
                                <td 
                                className="cursor-pointer hover:secondary"
                                onClick={() => handleSeatModalOpen(flight.id)}
                                >
                                
                                <button className="btn btn-primary">
                                <SeatIcon className="w-5 h-5" />
                                {flight.available_seats}
                                </button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    ) : (
                        <p className="flex justify-center">No Flights Found</p>
                    )}
                    <div className="flex justify-center mt-2">
                        <div className="join">
                            {currentPage > 1 && (
                            <button
                                className="join-item btn btn-accent "
                                onClick={() => paginate(currentPage - 1)}
                            >
                                «
                            </button>
                            )}
                            <button className="join-item btn">{currentPage}</button>
                            {currentPage < Math.ceil(filteredFlights.length / flightsPerPage) && (
                            <button
                                className="join-item btn btn-accent"
                                onClick={() => paginate(currentPage + 1)}
                            >
                                »
                            </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <dialog id="seat" className="modal">
            <div className="modal-box w-11/12 max-w-7xl bg-white">
                <SeatSelection modalFlag={modalFlag} />
            </div>
            <form method="dialog" className="modal-backdrop">
                <button
                onClick={handleSeatModalClose}
                >close</button>
            </form>
            </dialog>
            
            
        </>
    )
}

export default FlightDetailsByAircraftModal