import axios from "axios";

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
const token = document.cookie.split("token=")[1];
axios.defaults.headers.common["Authorization"] = token;


export const adminIndexUsersApi = async () => {
  try {
    const response = await axios.get(`${backendBaseUrl}/admin/users`, {});
    return response.data;
  } catch (error) {
    return error;
  }
};

export const adminIndexFlightsApi = async () => {
  try {
    const response = await axios.get(`${backendBaseUrl}/admin/flights`, {});
    return response.data;
  } catch (error) {
    return error;
  }
};