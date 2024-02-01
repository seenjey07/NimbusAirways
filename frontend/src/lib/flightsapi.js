const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
import axios from "axios";

export const flightsApi = async ({ origin_location, destination_location, departure_date }) => {
  try {
    const response = await axios.post(`${backendBaseUrl}/api/flights`, {
        origin_location,
        destination_location,
        departure_date,
    });
      console.log('flightsApi response:', response.data);
      return response.data;
    } catch (error) {
      console.log('flightsApi error:', error);
      throw error;
    }
};