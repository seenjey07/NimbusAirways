import {
  adminIndexRoutesApi,
  adminIndexAircraftsApi,
  adminCreateFlightsApi,
} from "../../../../lib/admin/adminusersapi";
import { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";

// eslint-disable-next-line react/prop-types
const CreateFlightsModal = () => {
  const [model, setModel] = useState("");
  const [family, setFamily] = useState("");
  const [seatCapacity, setSeatCapacity] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState("");
  const [aircrafts, setAircrafts] = useState("");
  const [routes, setRoutes] = useState("");
  const [terminal, setTerminal] = useState("");
  const [gate, setGate] = useState("");
  const [selectedAircraftId, setSelectedAircraftId] = useState("");
  const [isReturnFlight, setIsReturnFlight] = useState(false);
  const [departureDateTime, setDepartureDateTime] = useState(new Date());
  const [arrivalDateTime, setArrivalDateTime] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aircraftsData = await adminIndexAircraftsApi();
        const routesData = await adminIndexRoutesApi();
        setAircrafts(aircraftsData);
        setRoutes(routesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    event.preventDefault();

    const modifiedFlightsData = {
      route_id:
        origin === "Manila"
          ? destination
          : destination === "Manila"
          ? origin
          : origin || destination,
      departure_date: departureDateTime.toISOString(),
      arrival_date: arrivalDateTime.toISOString(),
      aircraft_id: selectedAircraftId,
      gate: gate,
      terminal: terminal,
    };

    try {
      await adminCreateFlightsApi(modifiedFlightsData);
      document.getElementById("CreateFlights").close();
    } catch (error) {
      console.error("Error making API request:", error);
    }
  };
  const handleAircraftChange = (selectedAircraftId) => {
    const selectedId = parseInt(selectedAircraftId, 10);
    const selectedAircraft = aircrafts.find(
      (aircraft) => aircraft.id === selectedId
    );

    setSelectedAircraftId(selectedId);
    setModel(selectedAircraft?.model || "");
    setFamily(selectedAircraft?.family || "");
    setSeatCapacity(selectedAircraft?.seat_capacity || "");
    setOrigin(selectedAircraft?.current_route?.origin_location || "");
    setDestination(selectedAircraft?.current_route?.destination_location || "");
    setStatus(selectedAircraft?.status || "");
    setPrice(selectedAircraft?.current_route?.price || "");
  };

  return (
    <>
      <form className="card-body" onSubmit={handleSubmit}>
        <h2 className="card-title justify-center text-secondary text-3xl font-bold">
          Create Flight
        </h2>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-secondary">Aircraft</span>
          </div>
          <select
            className="select select-bordered"
            name="aircraft"
            value={selectedAircraftId}
            onChange={(e) => handleAircraftChange(e.target.value)}
            required
          >
            <option disabled value="" selected>
              Select
            </option>
            {aircrafts.length === 0 ? (
              <option disabled value="">
                No aircraft available
              </option>
            ) : (
              aircrafts.map((aircraft) => (
                <option key={aircraft.id} value={aircraft.id}>
                  {aircraft.id} - {aircraft.model} - {aircraft.family} -{" "}
                  {aircraft.current_route?.origin_location &&
                  aircraft.current_route?.destination_location
                    ? `${aircraft.current_route.origin_location} to ${aircraft.current_route.destination_location}`
                    : "Not Assigned"}
                </option>
              ))
            )}
          </select>
        </label>

        <div className="flex justify-center gap-5">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-secondary">Model</span>
            </div>
            <input
              type="text"
              placeholder="Model"
              className="input input-bordered w-full max-w-xs placeholder-black"
              name="Model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              readOnly
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-secondary">Family</span>
            </div>
            <input
              type="text"
              placeholder="Family"
              className="input input-bordered w-full max-w-xs placeholder-black"
              name="middle_name"
              value={family}
              onChange={(e) => setFamily(e.target.value)}
              readOnly
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-secondary">Seat Capacity</span>
            </div>
            <input
              type="text"
              placeholder="Seat Capacity"
              className="input input-bordered w-full max-w-xs placeholder-black"
              name="last_name"
              value={seatCapacity}
              onChange={(e) => setSeatCapacity(e.target.value)}
              readOnly
            />
          </label>
        </div>

        <div className="flex">
          <input
            type="checkbox"
            className="toggle mt-2 mr-2"
            checked={isReturnFlight}
            onChange={() => setIsReturnFlight(!isReturnFlight)}
          />
          <label className="label text-secondary text-sm">
            Toggle if this is a return flight
          </label>
        </div>

        <div className="flex justify-center gap-16">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-secondary">Origin</span>
            </div>
            <select
              className="select select-bordered w-full max-w-xs placeholder-black"
              name="origin_route"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              required
            >
              <option disabled selected value="">
                Select Origin
              </option>
              {isReturnFlight ? (
                Array.isArray(routes) &&
                routes
                  .filter((route) => route.origin_location !== "Manila")
                  .map((route) => (
                    <option key={route.id} value={route.route_id}>
                      {route.origin_location}
                    </option>
                  ))
              ) : (
                <option>Manila</option>
              )}
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-secondary">Destination</span>
            </div>
            <select
              className="select select-bordered w-full max-w-xs placeholder-black"
              name="destination_route"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            >
              <option disabled selected value="">
                Select Destination
              </option>
              {isReturnFlight ? (
                <option>Manila</option>
              ) : (
                Array.isArray(routes) &&
                routes
                  .filter((route) => route.destination_location !== "Manila")
                  .map((route) => (
                    <option key={route.id} value={route.id}>
                      {route.destination_location}
                    </option>
                  ))
              )}
            </select>
          </label>
        </div>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-secondary">
              Departure Date and Time
            </span>
          </div>
          <DateTimePicker
            onChange={(date) => {
              setDepartureDateTime(date);
            }}
            value={departureDateTime}
            className="input input-bordered w-full max-w-xs placeholder-black"
            name="departure_date_time"
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-secondary">
              Arrival Date and Time
            </span>
          </div>
          <DateTimePicker
            onChange={setArrivalDateTime}
            value={arrivalDateTime}
            className="input input-bordered w-full max-w-xs "
            name="arrival_date_time"
          />
        </label>

        <div className="flex justify-center gap-16">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-secondary">Gate</span>
            </div>
            <input
              type="text"
              placeholder="Gate A1"
              className="input input-bordered w-full max-w-xs"
              name="email"
              value={gate}
              onChange={(e) => setGate(e.target.value)}
              required
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-secondary">Terminal</span>
            </div>
            <input
              type="text"
              placeholder="Terminal 1"
              className="input input-bordered w-full max-w-xs"
              name="terminal"
              value={terminal}
              onChange={(e) => setTerminal(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="flex justify-center gap-16">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-secondary">Price</span>
            </div>
            <input
              type="number"
              placeholder="Price"
              className="input input-bordered w-full max-w-xs"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-secondary">Status</span>
            </div>
            <select
              className="select select-bordered"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option disabled>Select</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </label>
        </div>

        <div className="card-actions justify-center mt-12">
          <button className="btn btn-secondary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateFlightsModal;
