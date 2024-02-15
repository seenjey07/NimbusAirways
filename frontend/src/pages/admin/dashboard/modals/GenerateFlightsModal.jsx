import { useState, useEffect } from "react";
import {
  adminGenerateFlightsApi,
  adminIndexAircraftsApi,
} from "../../../../lib/admin/adminusersapi";
import { indexedRoutesApi } from "../../../../lib/flightsapi";
// eslint-disable-next-line react/prop-types
const GenerateFlightsModal = () => {
  const [formData, setFormData] = useState({
    start_month: "",
    end_month: "",
    start_day: "",
    end_day: "",
    start_hour: "",
    end_hour: "",
    aircraft_id: "",
    route_id: "",
    return_route_id: "",
    gate: "",
    terminal: "",
    duration: "",
    adjustment_time: "",
  });
  const daysInMonth = (month, year) => new Date(year, month, 0).getDate();
  const hoursOfDay = Array.from({ length: 24 }, (_, index) => index);

  const currentYear = new Date().getFullYear();
  const [currentStartMonthDays, setCurrentStartMonthDays] = useState([]);
  const [currentEndMonthDays, setCurrentEndMonthDays] = useState([]);
  const [aircrafts, setAircrafts] = useState([]);
  const [routeOptions, setRouteOptions] = useState([]);
  const [selectedOriginRoute, setSelectedOriginRoute] = useState(null);
  const [selectedDestinationRoute, setSelectedDestinationRoute] =
    useState(null);
  const sortedRouteOptions = routeOptions
    .slice()
    .sort((a, b) => a.origin_location.localeCompare(b.origin_location));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectedOriginRoute = (option) => {
    setSelectedOriginRoute(option);
  };

  const handleSelectedDestinationRoute = (option) => {
    setSelectedDestinationRoute(option);
  };

  const months = Array.from({ length: 12 }, (_, index) => ({
    value: index + 1,
    label: new Date(2024, index, 1).toLocaleString("en-US", { month: "long" }),
  }));

  useEffect(() => {
    if (formData.start_month) {
      const startDays = Array.from(
        { length: daysInMonth(formData.start_month, currentYear) },
        (_, index) => index + 1
      );
      setCurrentStartMonthDays(startDays);
    }
  }, [formData.start_month, currentYear]);

  useEffect(() => {
    if (formData.end_month) {
      const endDays = Array.from(
        { length: daysInMonth(formData.end_month, currentYear) },
        (_, index) => index + 1
      );
      setCurrentEndMonthDays(endDays);
    }
  }, [formData.end_month, currentYear]);

  useEffect(() => {
    const fetchAircraftsData = async () => {
      try {
        const aircraftData = await adminIndexAircraftsApi();
        const routesData = await indexedRoutesApi();
        setAircrafts(aircraftData);
        setRouteOptions(routesData);
        console.log("hi routes", routesData);
      } catch (error) {
        console.error("Error fetching aircrafts:", error);
      }
    };
    fetchAircraftsData();
  }, []);

  const generateFlights = async () => {
    try {
      const response = await adminGenerateFlightsApi(formData);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="text-white flex flex-col justify-center">
      <h2 className="justify-center flex">Flight Generation</h2>
      <form>
        <div className="flex gap-5">
          <label>
            <div className="label">
              <span className="label-text text-white">Start Month</span>
            </div>
            <select
              className="text-black select select-bordered w-full max-w-xs"
              name="start_month"
              value={formData.start_month}
              onChange={handleChange}
            >
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <div className="label">
              <span className="label-text text-white">Start Day (dd)</span>
            </div>
            <select
              className="text-black select select-bordered w-full max-w-xs"
              name="start_day"
              value={formData.start_day}
              onChange={handleChange}
            >
              {currentStartMonthDays.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </label>

          <label>
            <div className="label">
              <span className="label-text text-white">Start Hour (hh)</span>
            </div>
            <select
              className="text-black select select-bordered w-full max-w-xs"
              name="start_hour"
              value={formData.start_hour}
              onChange={handleChange}
            >
              {hoursOfDay.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex gap-5">
          <label>
            <div className="label">
              <span className="label-text text-white">End Month</span>
            </div>
            <select
              className="text-black select select-bordered w-full max-w-xs"
              name="end_month"
              value={formData.end_month}
              onChange={handleChange}
            >
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <div className="label">
              <span className="label-text text-white">End Day (dd)</span>
            </div>
            <select
              className="text-black select select-bordered w-full max-w-xs"
              name="end_day"
              value={formData.end_day}
              onChange={handleChange}
            >
              {currentEndMonthDays.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </label>

          <label>
            <div className="label">
              <span className="label-text text-white">End Hour (hh)</span>
            </div>
            <select
              className="text-black select select-bordered w-full max-w-xs"
              name="end_hour"
              value={formData.end_hour}
              onChange={handleChange}
            >
              {hoursOfDay.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label>
          <div className="label">
            <span className="label-text text-white">Aircraft</span>
          </div>
          <select
            className="text-black select select-bordered w-full max-w-xs"
            name="aircraft_id"
            value={formData.aircraft_id}
            onChange={handleChange}
          >
            {aircrafts?.map((aircraft) => (
              <option key={aircraft.id} value={aircraft.id}>
                {aircraft.family} {aircraft.model} ||{" "}
                {aircraft.current_route
                  ? `${aircraft.current_route.destination_code}-${aircraft.current_route.origin_code}`
                  : "Not Assigned"}
              </option>
            ))}
          </select>
        </label>

        <div className="flex gap-10">
          <form className="w-full">
            <label className="form-control w-full max-w-xs">
              Select Origin:
              <select
                className="select select-bordered w-full max-w-xs text-black"
                value={selectedOriginRoute ? selectedOriginRoute.id : ""}
                onChange={(e) => {
                  const selectedOption = routeOptions.find(
                    (option) => option.id === e.target.value
                  );
                  handleSelectedOriginRoute(selectedOption);
                }}
              >
                <option value="" disabled>
                  -- Select Origin Route --
                </option>
                {routeOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.origin_location}
                  </option>
                ))}
              </select>
            </label>
            {selectedOriginRoute && (
              <>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-white">Origin</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    disabled
                    value={selectedOriginRoute.origin_location}
                  />
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-white">Code</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    disabled
                    value={selectedOriginRoute.origin_code}
                  />
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-white">Location</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    disabled
                    value={selectedOriginRoute.origin_name}
                  />
                </label>
              </>
            )}
          </form>

          <form className="w-full">
            <label className="form-control w-full max-w-xs">
              Select Destination:
              <select
                className="select select-bordered w-full max-w-xs text-black"
                value={
                  selectedDestinationRoute
                    ? String(selectedDestinationRoute.id)
                    : ""
                }
                onChange={(e) => {
                  const selectedOption = routeOptions.find(
                    (option) => option.id === parseInt(e.target.value, 10)
                  );
                  handleSelectedDestinationRoute(selectedOption);
                }}
              >
                <option value="" disabled>
                  -- Select Destination Route --
                </option>
                {routeOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.destination_location}
                  </option>
                ))}
              </select>
            </label>
            {selectedDestinationRoute && (
              <>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-white">Destination</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    disabled
                    value={selectedDestinationRoute.destination_location}
                  />
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-white">Code</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    disabled
                    value={selectedDestinationRoute.destination_code}
                  />
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-white">Location</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    disabled
                    value={selectedDestinationRoute.destination_name}
                  />
                </label>
              </>
            )}
          </form>
        </div>

        <div className="flex justify-center">
          <button
            className="btn btn-primary mt-3"
            type="button"
            onClick={generateFlights}
          >
            Generate Flights
          </button>
        </div>
      </form>
    </div>
  );
};

export default GenerateFlightsModal;
