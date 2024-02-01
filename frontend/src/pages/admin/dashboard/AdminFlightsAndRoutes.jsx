import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { adminIndexFlightsApi } from "../../../lib/admin/adminusersapi";

const AdminFlightsAndRoutes = () => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const flightsData = await adminIndexFlightsApi();
        const formattedEvents = flightsData.map((flight) => ({
          id: flight.id,
          title: flight.flight_number,
          start: new Date(flight.departure_date),
          end: new Date(flight.arrival_date),
          flightDetails: flight,
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  const openDetailsModal = () => {
    const modal = document.getElementById("FlightDetails");
    modal.showModal();
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event.flightDetails);
    openDetailsModal();
  };

  return (
    <div className="glass">
      <Calendar
         localizer={localizer}
         events={events}
         startAccessor="start"
         endAccessor="end"
         views={['day']} 
         defaultView="day"
        onSelectEvent={handleEventClick}
      />
      
      <dialog id="FlightDetails" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("FlightDetails").close()}
            >
              ✕
            </button>
          </form>
          <span className="font-bold text-2xl mb-5">FLIGHT DETAILS</span>
          {selectedEvent && (
            <div className="overflow-x-auto">
            <table className="table">
              <tbody>
                <tr className="bg-base-200">
                  <th className="text-right">Flight Number:</th>
                  <td>{selectedEvent.flight_number}</td>
                </tr>
                <tr>
                  <th className="text-right">Origin:</th>
                  <td>{selectedEvent.route.origin_name} ({selectedEvent.route.origin_code})</td>
                </tr>
                <tr className="bg-base-200">
                  <th className="text-right">ETD:</th>
                  <td>{selectedEvent.departure_date}</td>
                </tr>
                <tr>
                  <th className="text-right">Destination:</th>
                  <td>{selectedEvent.route.destination_name} ({selectedEvent.route.destination_code})</td>
                </tr>
                <tr className="bg-base-200">
                  <th className="text-right">ETA:</th>
                  <td>{selectedEvent.arrival_date}</td>
                </tr>
                <tr>
                  <th className="text-right">Available Seats:</th>
                  <td>{selectedEvent.available_seats}</td>
                </tr>
                <tr className="bg-base-200">
                  <th className="text-right">Gate:</th>
                  <td>{selectedEvent.gate}</td>
                </tr>
                <tr>
                  <th className="text-right">Terminal:</th>
                  <td>{selectedEvent.terminal}</td>
                </tr>
                <tr className="bg-base-200">
                  <th className="text-right">Gate:</th>
                  <td>{selectedEvent.gate}</td>
                </tr>
                <tr>
                  <th className="text-right">Aircraft:</th>
                  <td>{selectedEvent.aircraft.family} {selectedEvent.aircraft.model}</td>
                </tr>
                <tr className="bg-base-200">
                  <th className="text-right">Seat Capacity:</th>
                  <td>{selectedEvent.aircraft.seat_capacity}</td>
                </tr>
                <tr>
                  <th className="text-right"> Base Price:</th>
                  <td>{selectedEvent.route.price}</td>
                </tr>
              </tbody>
            </table>
          </div>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default AdminFlightsAndRoutes;