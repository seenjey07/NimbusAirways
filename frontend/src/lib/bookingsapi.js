import axios from "axios";
const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
const token = document.cookie.split("token=")[1];
axios.defaults.headers.common["Authorization"] = token;

export const indexBookingsApi = async () => {
  try {
    const response = await axios.get(
      `${backendBaseUrl}/api/bookings/index`,
      {}
    );
    console.log("indexBookingsApi response:", response);
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

export const showBookingApi = async (booking_reference) => {
  try {
    const response = await axios.get(
      `${backendBaseUrl}/api/bookings/show?booking_reference=${booking_reference}`
    );
    console.log("showBookingApi response:", response);
    return response;
  } catch (error) {
    console.log("showBookingApi error:", error);
    throw error;
  }
};

export const updateBookingApi = async (booking_reference, bookingData) => {
  try {
    const response = await axios.put(
      `${backendBaseUrl}/api/bookings/${booking_reference}`,
      bookingData
    );
    console.log("updateBookingApi response:", response);
    return response;
  } catch (error) {
    console.log("updateBookingApi error:", error);
    throw error;
  }
};

export const destroyBookingApi = async (booking_reference) => {
  try {
    const response = await axios.delete(
      `${backendBaseUrl}/api/bookings/${booking_reference}`
    );
    console.log("destroyBookingApi response:", response);
    return response;
  } catch (error) {
    console.log("destroyBookingApi error:", error);
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
