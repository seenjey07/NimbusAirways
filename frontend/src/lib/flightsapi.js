const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
import axios from "axios";

export const indexFlightsApi = async () => {
  try {
    const response = await axios.get(`${backendBaseUrl}/api/flights`);
    console.log("indexFlightsApi response:", response);

    const routesResponse = await axios.get(`${backendBaseUrl}/api/routes`);
    const routesMap = new Map(
      routesResponse.data.routes.map((route) => [route.id, route])
    );

    const flightsWithRoutes = response.data.flights.map((flight) => ({
      flight_number: flight.flight_number,
      origin_location: flight.origin_location,
      date_of_departure: flight.date_of_departure,
      departure_location: flight.departure_location,
      date_of_arrival: flight.date_of_arrival,
      price: routesMap.get(flight.route_id)?.price || 0,
    }));

    return flightsWithRoutes;
  } catch (error) {
    console.log("indexFlightsApi error:", error);
    throw error;
  }
};

export const flightsApi = async ({
  origin_location,
  destination_location,
  departure_date,
}) => {
  try {
    const response = await axios.post(`${backendBaseUrl}/api/flights`, {
      origin_location,
      destination_location,
      departure_date,
    });
    console.log("flightsApi response:", response.data);
    return response.data;
  } catch (error) {
    console.log("flightsApi error:", error);
    throw error;
  }
};
