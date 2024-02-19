import axios from "axios";
const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
const token = document.cookie.split("token=")[1];
axios.defaults.headers.common["Authorization"] = token;

export const indexBookingsApi = async () => {
  try {
    const response = await axios.get(`${backendBaseUrl}/api/bookings`);
    return response;
  } catch (error) {
    console.log("indexBookingsApi error:", error);
    throw error;
  }
};

export const createBookingApi = async () => {
  try {
    const response = await axios.post(`${backendBaseUrl}/api/bookings/create`);
    console.log("createBookingApi response:", response);
    return response;
  } catch (error) {
    console.log("createBookingApi error:", error);
    throw error;
  }
};

export const showBookingApi = async (id) => {
  try {
    const response = await axios.get(`${backendBaseUrl}/api/bookings/${id}`);
    return response;
  } catch (error) {
    console.log("showBookingApi error:", error);
    throw error;
  }
};

export const updateBookingApi = async (id, bookingData) => {
  try {
    const response = await axios.put(
      `${backendBaseUrl}/api/bookings/${id}`,
      bookingData
    );
    console.log("updateBookingApi response:", response);
    return response.data;
  } catch (error) {
    console.log("updateBookingApi error:", error);
    throw error;
  }
};

export const deleteBookingApi = async (id) => {
  try {
    const response = await axios.delete(`${backendBaseUrl}/api/bookings/${id}`);
    console.log("deleteBookingApi response:", response);
    return response.data;
  } catch (error) {
    console.log("deleteBookingApi error:", error);
    throw error;
  }
};

export const createUserBookingApi = async (bookingData) => {
  try {
    const response = await axios.post(
      `${backendBaseUrl}/api/book`,
      bookingData
    );
    return response.data;
  } catch (error) {
    console.error("createUserBookingApi error:", error);
    throw error;
  }
};
