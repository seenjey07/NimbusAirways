import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { adminIndexFlightsApi } from "../../../lib/admin/adminusersapi";
import {
  CreateFlightIcon,
  CreateRouteIcon,
  ShowRouteIcon,
} from "../../../components/icons/icons";
import format from "date-fns/format";
import CreateFlightsModal from "./modals/CreateFlightsModal";
import CreateRoutesModal from "./modals/CreateRoutesModal";
import ShowRoutesModal from "./modals/ShowRoutesModal";
import Loading from "../../../components/Loading";

// eslint-disable-next-line react/prop-types
const AdminFlightsAndRoutes = ({ addAlert }) => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
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
    <>
      <dialog id="CreateFlights" className="modal">
        <div className="modal-box bg-accent">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-secondary">
              ✕
            </button>
          </form>
          <CreateFlightsModal addAlert={addAlert} />
        </div>
      </dialog>

      <dialog id="CreateRoutes" className="modal">
        <div className="modal-box bg-accent">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-secondary">
              ✕
            </button>
          </form>
          <CreateRoutesModal addAlert={addAlert} />
        </div>
      </dialog>

      <dialog id="ShowRoutes" className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-accent">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-secondary">
              ✕
            </button>
          </form>
          <ShowRoutesModal />
        </div>
      </dialog>

      <dialog id="FlightDetails" className="modal">
        <div className="modal-box bg-white">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("FlightDetails").close()}
            >
              ✕
            </button>
          </form>

          <span className="font-bold text-2xl mb-5 flex justify-center">
            FLIGHT DETAILS
          </span>
          {selectedEvent && (
            <div className="overflow-x-auto">
              <table className="table bg-slate-200 rounded-md shadow-md">
                <tbody>
                  <tr className="bg-base-200">
                    <th className="text-right">Flight Number:</th>
                    <td>{selectedEvent.flight_number}</td>
                  </tr>
                  <tr>
                    <th className="text-right">Origin:</th>
                    <td>
                      {selectedEvent.route.origin_name} (
                      {selectedEvent.route.origin_code})
                    </td>
                  </tr>
                  <tr className="bg-base-200">
                    <th className="text-right">ETD:</th>
                    <td>
                      {format(
                        new Date(selectedEvent.departure_date),
                        "MMMM dd, yyyy hh:mm a"
                      ) || selectedEvent.departure_date}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-right">Destination:</th>
                    <td>
                      {selectedEvent.route.destination_name} (
                      {selectedEvent.route.destination_code})
                    </td>
                  </tr>
                  <tr className="bg-base-200">
                    <th className="text-right">ETA:</th>
                    <td>
                      {format(
                        new Date(selectedEvent.arrival_date),
                        "MMMM dd, yyyy hh:mm a"
                      ) || selectedEvent.arrival_date}
                    </td>
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
                    <td>
                      {selectedEvent.aircraft.family}{" "}
                      {selectedEvent.aircraft.model}
                    </td>
                  </tr>
                  <tr className="bg-base-200">
                    <th className="text-right">Seat Capacity:</th>
                    <td>{selectedEvent.aircraft.seat_capacity}</td>
                  </tr>
                  <tr>
                    <th className="text-right">Base Price:</th>
                    <td>₱ {selectedEvent.route.price}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </dialog>

      <div>
        <div className="mt-2 flex">
          <div className="flex">
            <button
              className="btn btn-accent text-secondary self-center ml-3 px-6"
              onClick={() =>
                document.getElementById("CreateFlights").showModal()
              }
            >
              <CreateFlightIcon className="w-6 h-6" />
              Create Flight
            </button>
          </div>

          <div className="join ml-2 bg-accent">
            <button
              className="btn join-item btn-accent text-secondary self-center"
              onClick={() =>
                document.getElementById("CreateRoutes").showModal()
              }
            >
              <CreateRouteIcon className="w-6 h-6" />
              Create Routes
            </button>
            <div className="divider divider-horizontal divider-secondary"></div>
            <button
              className="btn join-item btn-accent text-secondary self-center"
              onClick={() => document.getElementById("ShowRoutes").showModal()}
            >
              <ShowRouteIcon className="w-6 h-6" />
              Show Routes
            </button>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            views={["day"]}
            defaultView="day"
            onSelectEvent={handleEventClick}
          />
        )}
      </div>
    </>
  );
};

export default AdminFlightsAndRoutes;
