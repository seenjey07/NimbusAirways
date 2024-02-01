const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
import axios from "axios";

export const flightsApi = async () => {
  try {
    const response = await axios.post(`${backendBaseUrl}/api/flights`, {
      origin_location,
      destination_location,
      departure_date,
    });
      return response.data;
  } catch (error) {
    return error;
  }
};