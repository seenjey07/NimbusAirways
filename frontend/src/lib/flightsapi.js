const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
import axios from "axios";

export const indexFlightsApi = async () => {
  try {
    const response = await axios.get(`${backendBaseUrl}/api/flights#index`);
    console.log("indexFlightsApi response:", response.data);

    const flights = response.data.flights;
    console.log("flights:", flights);
    return flights;
  } catch (error) {
    console.log("indexFlightsApi error:", error);
    throw error;
  }
};

export const indexedFlightsApi = async () => {
  try {
    const response = await axios.get(
      `${backendBaseUrl}/api/indexedflights`,
      {}
    );
    return response.data;
  } catch (error) {
    return error;
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
    console.log("flightsApi response:", response.data.flights);
    return response.data.flights;
  } catch (error) {
    console.log("flightsApi error:", error);
    throw error;
  }
};

export const indexedRoutesApi = async () => {
  try {
    const response = await axios.get(`${backendBaseUrl}/api/routes`, {});
    return response.data;
  } catch (error) {
    return error;
  }
};

export const showCurrentFlightApi = async (flight_id) => {
  try {
    const response = await axios.get(
      `${backendBaseUrl}/api/flights/${flight_id}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
