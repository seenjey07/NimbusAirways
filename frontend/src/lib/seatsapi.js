const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
import axios from "axios";

export const indexedSeatsFromFlightsApi = async (id) => {
  try {
    const response = await axios.get(`${backendBaseUrl}/flights/${id}/seats`);
    return response;
  } catch (error) {
    return error;
  }
};
