import axios from "axios";
const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
const token = document.cookie.split("token=")[1];
axios.defaults.headers.common["Authorization"] = token;

export const showCurrentUserApi = async () => {
    try {
      const response = await axios.get(
        `${backendBaseUrl}/api/user`
      );
      console.log("showBookingApi response:", response);
      return response;
    } catch (error) {
      console.log("showBookingApi error:", error);
      throw error;
    }
  };