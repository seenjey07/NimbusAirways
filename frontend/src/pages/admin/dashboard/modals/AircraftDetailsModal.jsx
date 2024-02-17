import { adminFlightDetailsByAircraftApi } from "../../../../lib/admin/adminusersapi"
import { useState, useEffect } from "react";
import SeatLayoutA220_100 from "../../../../components/SeatLayoutA220_100"
import SeatLayoutA320neo from "../../../../components/SeatLayoutA320neo";
import SeatLayoutATR72 from "../../../../components/SeatLayoutATR72";
import { format } from "date-fns";
// eslint-disable-next-line react/prop-types
const AircraftDetailsModal = ({aircraftId}) => {
    const [flightData, setFlightData] = useState({
        aircraft: {},
        status: "",
        current_route: {},
        current_flights: [],
        all_flights: [],
      });
    const [isLoading, setIsLoading] = useState(true)
    const [aircraft, setAircraft] = useState("")
    
    useEffect(() => {
        const fetchFlights = async () => {
          try {
            const response = await adminFlightDetailsByAircraftApi(aircraftId);
            setFlightData((prevFlightData) => ({
              ...prevFlightData,
              all_flights: response.all_flights,
              current_route: response.current_route,
              current_flights: response.current_flights,
              aircraft: response.aircraft,
              status: response.status
            }));
            setIsLoading(false);
            setAircraft(response.aircraft)
            console.log("hi flights modal", response);
            console.log("hi flights modal routes", response.current_route);
          } catch (error) {
            setIsLoading(false);
            console.error("Error fetching flights:", error);
          }
        };
        fetchFlights();
      }, [aircraftId]);

        const allFlights = flightData.all_flights
        const sortedFlights = allFlights.sort((a, b) => new Date(a.departure_date) - new Date(b.departure_date));
        const lastFlight = sortedFlights[sortedFlights.length - 1];
        const calculateAge = (created_at) => {
            const createdAtDate = new Date(created_at);
            const currentDate = new Date();
            const ageInMilliseconds = currentDate - createdAtDate;
            const ageInMonths = ageInMilliseconds / (1000 * 60 * 60 * 24 * 30.44);
            const roundedAgeInMonths = ageInMonths.toFixed(2);
            return `${roundedAgeInMonths} months`;
          };

          const getCurrentFlightNumber = (allFlights) => {
            const currentDate = new Date();
            const currentFlights = allFlights.filter(flight => new Date(flight.departure_date) <= currentDate);
          
            console.log("Current Flights:", currentFlights);
          
            return { currentFlightNumber: currentFlights.length };
          };
          
          const { currentFlightNumber } = getCurrentFlightNumber(allFlights);

          const getNextFlight = () => {
            const currentDate = new Date();
            if (flightData?.current_flights.length > 0) {
              const sortedFlights = flightData.current_flights
                .filter(flight => new Date(flight.departure_date) > currentDate)
                .sort((a, b) => new Date(a.departure_date) - new Date(b.departure_date));
              if (sortedFlights.length > 0) {
                return sortedFlights[0];
              }
            }
            const allFlightsAfterNow = flightData?.all_flights
              .filter(flight => new Date(flight.departure_date) > currentDate)
              .sort((a, b) => new Date(a.departure_date) - new Date(b.departure_date));
            if (allFlightsAfterNow.length > 0) {
              return allFlightsAfterNow[0];
            }
            return null;
          };
          
          const nextFlight = getNextFlight();
        
    return (
        <>
            <div className="flex gap-24 justify-center mt-5">
                <table>
                    <tbody>
                        <tr>
                            <td className="font-bold text-right">Family</td>
                            <td className="flex ml-3">{aircraft?.family || 'N/A'}</td>
                        </tr>

                        <tr>
                            <td className="font-bold text-right">Model</td>
                            <td className="flex ml-3">{aircraft?.model || 'N/A'}</td>
                        </tr>

                        <tr>
                        <td className="font-bold text-right">Route</td>
                        <td className="flex ml-3">
                            {flightData.current_route ? (
                            `${flightData.current_route.origin_location} to ${flightData.current_route.destination_location} vice versa`
                            ) : (
                            'N/A'
                            )}
                        </td>
                        </tr>

                        <tr>
                            <td className="font-bold text-right">Number of Flights</td>
                            <td className="flex ml-3">{flightData?.all_flights.length || 0}</td>
                        </tr>

                        <tr>
                            <td className="font-bold text-right">Seat Capacity</td>
                            <td className="flex ml-3">{aircraft?.seat_capacity || 'N/A'}</td>
                        </tr>

                        <tr>
                            <td className="font-bold text-right">Date Bought</td>
                            <td className="flex ml-3">{aircraft?.created_at ? format(new Date(aircraft.created_at), 'MMMM dd, yyyy hh:mm a') : 'N/A'}</td>
                        </tr>

                        <tr>
                            <td className="font-bold text-right">Age</td>
                            <td className="flex ml-3">{aircraft?.created_at && calculateAge(aircraft.created_at) || 'N/A'}</td>
                        </tr>

                        <tr>
                            <td className="font-bold text-right">Flight Count</td>
                            <td className="flex ml-3">Flight {currentFlightNumber || 0 } of {flightData?.all_flights.length || 0}</td>
                        </tr>

                        <tr>
                            <td className="font-bold text-right">Status</td>
                            <td className="flex ml-3">{flightData?.status?.toUpperCase() || 'N/A'}</td>
                        </tr>
                    </tbody>
                </table>

                <div>
                <span className="flex justify-center font-bold text-lg underline">Final Generated Flight</span>
                    <table> 
                        <tbody>
                            <tr>
                            <td className="font-bold text-right">Departure Date</td>
                            <td className="flex ml-3">{lastFlight?.departure_date ? format(new Date(lastFlight.departure_date), 'MMMM dd, yyyy hh:mm a') : 'N/A'}</td>
                            </tr>

                            <tr>
                            <td className="font-bold text-right">Arrival Date</td>
                            <td className="flex ml-3">{lastFlight?.arrival_date ? format(new Date(lastFlight.arrival_date), 'MMMM dd, yyyy hh:mm a') : 'N/A'}</td>
                            </tr>
                        </tbody>
                    </table>

                    <span className="flex justify-center font-bold text-lg underline">Next Flight</span>
                    <table> 
                        <tbody>
                            <tr>
                            <td className="font-bold text-right">Departure Date</td>
                            <td className="flex ml-3">{nextFlight?.departure_date ? format(new Date(nextFlight.departure_date), 'MMMM dd, yyyy hh:mm a') : 'N/A'}</td>
                            </tr>

                            <tr>
                            <td className="font-bold text-right">Arrival Date</td>
                            <td className="flex ml-3">{nextFlight?.arrival_date ? format(new Date(nextFlight.arrival_date), 'MMMM dd, yyyy hh:mm a') : 'N/A'}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div>
                        {flightData?.current_flights.length > 0 ? (
                            <div>
                                <div className="flex justify-center font-bold text-lg underline">Current Flight -<span className="italic ml-1">({flightData?.current_flights[0]?.flight_number})</span></div>
                                <table>
                                    <tbody>
                                        {flightData?.current_flights.map((flight, index) => (
                                            <div key={index}>
                                                <tr>
                                                    <td className="font-bold text-right">Departure Date</td>
                                                    <td className="flex ml-3">{format(new Date(flight.departure_date), 'MMMM dd, yyyy hh:mm a')}</td>
                                                </tr>

                                                <tr>
                                                    <td className="font-bold text-right">Arrival Date</td>
                                                    <td className="flex ml-3">{format(new Date(flight.arrival_date), 'MMMM dd, yyyy hh:mm a')}</td>
                                                </tr>
                                            </div>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex justify-center font-bold text-lg mt-5 italic">
                                *No current flight*
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-7">
                    <span className="flex justify-center font-bold text-lg"> {aircraft.family} {aircraft.model} Seat Configuration</span>
            {aircraft?.model === "A220-100" && (
                    <>
                        <span className="flex justify-center font-bold">WINDOW</span>
                        <SeatLayoutA220_100 />
                        <span className="flex justify-center font-bold">WINDOW</span>
                    </>
                    )}

                    {aircraft?.model === "ATR 72-600" && (
                    <>
                        <span className="flex justify-center font-bold">WINDOW</span>
                        <SeatLayoutATR72 />
                        <span className="flex justify-center font-bold">WINDOW</span>
                    </>
                    )}

                    {aircraft?.model === "A320neo" && (
                    <>
                        <span className="flex justify-center font-bold">WINDOW</span>
                        <SeatLayoutA320neo />
                        <span className="flex justify-center font-bold">WINDOW</span>
                    </>
                    )}
            </div>
        </>
    )
}

export default AircraftDetailsModal