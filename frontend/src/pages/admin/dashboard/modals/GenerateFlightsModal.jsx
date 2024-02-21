import { useState, useEffect } from "react";
import {
  adminGenerateFlightsApi,
  adminIndexAircraftsApi,
} from "../../../../lib/admin/adminusersapi";
import { indexedRoutesApi } from "../../../../lib/flightsapi";
// eslint-disable-next-line react/prop-types
const GenerateFlightsModal = ({ addAlert }) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
      } catch (error) {
        console.error("Error fetching aircrafts:", error);
      }
    };
    fetchAircraftsData();
  }, []);

  const generateFlights = async () => {
    try {
      await adminGenerateFlightsApi(formData);
      addAlert('success', 'Flights generated successfully!');
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="text-white flex flex-col justify-center">
      <h2 className="justify-center flex text-2xl font-bold">
        Generate Flights
      </h2>
      <form>
        <div className="flex justify-center gap-5">
          <label>
            <div className="label">
              <span className="label-text text-white">Start Month</span>
            </div>
            <select
              className="text-black select select-bordered w-full max-w-xs text-center"
              name="start_month"
              value={formData.start_month}
              onChange={handleChange}
            >
              <option selected disabled>
                Month
              </option>
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
              className="text-black select select-bordered w-full max-w-xs text-center"
              name="start_day"
              value={formData.start_day}
              onChange={handleChange}
            >
              <option selected disabled>
                Day
              </option>
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
              className="text-black select select-bordered w-full max-w-xs text-center"
              name="start_hour"
              value={formData.start_hour}
              onChange={handleChange}
            >
              <option selected disabled>
                Hour
              </option>
              {hoursOfDay.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex justify-center gap-5">
          <label>
            <div className="label">
              <span className="label-text text-white">End Month</span>
            </div>
            <select
              className="text-black select select-bordered w-full max-w-xs text-center"
              name="end_month"
              value={formData.end_month}
              onChange={handleChange}
            >
              <option selected disabled>
                Month
              </option>
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
              className="text-black select select-bordered w-full max-w-xs text-center"
              name="end_day"
              value={formData.end_day}
              onChange={handleChange}
            >
              <option selected disabled>
                Day
              </option>
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
              className="text-black select select-bordered w-full max-w-xs text-center"
              name="end_hour"
              value={formData.end_hour}
              onChange={handleChange}
            >
              <option selected disabled>
                Hour
              </option>
              {hoursOfDay.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex justify-center">
          <label>
            <div className="label">
              <span className="label-text text-white">Aircraft</span>
            </div>
            <select
              className="text-black select select-bordered w-full text-center"
              name="aircraft_id"
              value={formData.aircraft_id}
              onChange={handleChange}
            >
              <option selected disabled>
                Select Aircraft
              </option>
              {aircrafts?.map((aircraft) => (
                <option key={aircraft?.id} value={aircraft?.id}>
                  {aircraft?.family} {aircraft?.model} |{" "}
                  {aircraft?.current_route
                    ? `${aircraft.current_route?.destination_code}-${aircraft.current_route?.origin_code}`
                    : "Not Assigned"}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex justify-center">
          <label>
            <div className="label">
              <span className="label-text text-white">Choose Route</span>
            </div>
            <select
              className="text-black select select-bordered w-full text-center"
              name="end_month"
              value={formData.route_id}
              onChange={(e) => {
                const selectedRouteId = e.target.value;
                const selectedRouteNumber = parseInt(selectedRouteId, 10);
                const nextOddRouteId =
                  selectedRouteNumber % 2 === 1
                    ? selectedRouteNumber + 1
                    : null;

                setFormData({
                  ...formData,
                  route_id: selectedRouteId,
                  return_route_id: nextOddRouteId
                    ? nextOddRouteId.toString()
                    : null,
                });
              }}
            >
              <option selected disabled>
                Choose Route
              </option>
              {routeOptions
                .filter((route) => route.id % 2 !== 0)
                .map((route) => (
                  <option key={route.id} value={route.id}>
                    {route.origin_location} - {route.destination_location} |{" "}
                    {route.destination_location} - {route.origin_location}
                  </option>
                ))}
            </select>
          </label>
        </div>

        <div className="flex gap-5 ">
          <label className="form-control w-full max-w-xs text-center">
            <div className="label">
              <span className="label-text text-white">Duration</span>
              <span className="label-text text-white">Minutes</span>
            </div>
            <input
              type="number"
              placeholder="Duration in Minutes (MM)"
              className="input input-bordered w-full max-w-xs text-black"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
            <div className="label">
              <span className="label-text-alt text-white">
                70 = 1 hour 10 min
              </span>
              <span className="label-text-alt text-white">Required</span>
            </div>
          </label>

          <label className="form-control w-full max-w-xs text-center ">
            <div className="label">
              <span className="label-text text-white">Adjustment Time</span>
              <span className="label-text text-whitetext-white">Minutes</span>
            </div>
            <input
              type="number"
              placeholder="Duration in Minutes (MM)"
              className="input input-bordered w-full max-w-xs text-black"
              name="adjustment_time"
              value={formData.adjustment_time}
              onChange={handleChange}
            />
            <div className="label">
              <span className="label-text-alt text-white">
                This is a buffer time
              </span>
              <span className="label-text-alt text-white">Required</span>
            </div>
          </label>
        </div>

        <div className="flex gap-5">
          <label className="form-control w-full max-w-xs text-center">
            <div className="label">
              <span className="label-text text-white">Gate</span>
            </div>
            <input
              type="text"
              placeholder="TBA"
              className="input input-bordered w-full max-w-xs text-black"
              name="gate"
              value={formData.gate}
              onChange={handleChange}
            />
            <div className="label">
              <span className="label-text-alt text-white">
                This is subject to change
              </span>
              <span className="label-text-alt text-white">Required</span>
            </div>
          </label>

          <label className="form-control w-full max-w-xs text-center ">
            <div className="label">
              <span className="label-text text-white">Terminal</span>
              <span className="label-text text-white"></span>
            </div>
            <input
              type="text"
              placeholder="TBA"
              className="input input-bordered w-full max-w-xs text-black"
              name="terminal"
              value={formData.terminal}
              onChange={handleChange}
            />
            <div className="label">
              <span className="label-text-alt text-white">
                This is subject to change
              </span>
              <span className="label-text-alt text-white">Required</span>
            </div>
          </label>
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
