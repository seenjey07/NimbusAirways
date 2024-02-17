import { adminFlightDetailsByAircraftApi } from "../../../../lib/admin/adminusersapi"
import { useState, useEffect } from "react";
import Loading from "../../../../components/Loading"
// eslint-disable-next-line react/prop-types
const FlightDetailsByAircraftModal = ({aircraftId}) => {
    const [flightData, setFlightData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
    const fetchRoutes = async () => {
        try {
        const response = await adminFlightDetailsByAircraftApi(aircraftId);
        setFlightData(response);
        setIsLoading(false);
        console.log("hi flights modal", response);
        } catch (error) {
        console.error("Error fetching routes:", error);
        }
    };

    fetchRoutes();
    }, [aircraftId]);

    return (
        <>
            {isLoading ? (
                <Loading />
                ) : (
                <div className="overflow-x-auto bg-white">
                <table className="table table-zebra">
                    <thead>
                    <tr>
                        <th className="text-white font-bold">No.</th>
                        <th className="text-white font-bold">Flight Number</th>
                        <th className="text-white font-bold">Departure</th>
                        <th className="text-white font-bold">Arrival</th>
                    </tr>
                    </thead>
                    <tbody>
                    {flightData.all_flights.map((flight, index) => (
                        <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{flight.flight_number}</td>
                        <td>{flight.departure_date}</td>
                        <td>{flight.arrival_date}</td>
                        <td>{flight.route_id}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            )}
        </>
    )
}

export default FlightDetailsByAircraftModal