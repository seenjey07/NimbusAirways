const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
import axios from "axios";

export const adminIndexUsersApi = async () => {
  try {
    const response = await axios.get(`${backendBaseUrl}/admin/users`, {});
    return response.data;
  } catch (error) {
    return error;
  }
};