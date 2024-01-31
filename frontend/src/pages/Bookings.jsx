const backendBaseUrl = "http://localhost:3000";
import useNavigate from "react-router-dom";
import axios from "axios";

// --- Declarations (Unused for now) ---

export const createBooking = async (data) => {
  const { navigate } = useNavigate();

  try {
    const response = await axios.post("$(backendBaseUrl)/api/bookings", data);
    console.log("New Booking:", response.data);
    navigate("$(backendBaseUrl)/api/bookings/${booking_reference}");
  } catch (error) {
    console.error("Error creating booking:", error);
  }
};

export const getBookingDetails = async (booking_reference) => {
  try {
    const response = await axios.get(
      `$(backendBaseUrl)/api/bookings/${booking_reference}`
    );
    console.log("Booking Details:", response.data);
  } catch (error) {
    console.error("Error fetching booking details:", error);
  }
};

export const updateBooking = async (booking_reference, data) => {
  try {
    const response = await axios.put(
      `$(backendBaseUrl)/api/bookings/${booking_reference}`,
      data
    );
    console.log("Updated Booking:", response.data);
  } catch (error) {
    console.error("Error updating booking:", error);
  }
};

export const cancelBooking = async (booking_reference) => {
  try {
    await axios.delete(`$(backendBaseUrl)/api/bookings/${booking_reference}`);
    console.log("Booking Cancelled Successfully");
  } catch (error) {
    console.error("Error cancelling booking:", error);
  }
};

// --- End of Declarations ---

// --- Function Usage (Add this when you start using these functions) ---

// Example usage
const usageExample = async () => {
  const bookingData = {
    /* your data here */
  };

  await createBooking(bookingData);
  await getBookingDetails(123); // Provide an actual booking ID
  await updateBooking(456, bookingData); // Provide an actual booking ID and data
  await cancelBooking(789); // Provide an actual booking ID
};

// --- End of Function Usage ---

// You can add more sections or comments to indicate your code structure
