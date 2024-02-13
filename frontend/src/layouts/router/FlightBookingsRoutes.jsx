import FlightBookingsLayout from "../FlightBookingsLayout";
import { Routes, Route } from "react-router-dom";
import FlightBookings from "../../pages/user/FlightBookings";
import BookingsComponent from "../../pages/user/Bookings";
import { useEffect } from "react";
import axios from "axios";
// eslint-disable-next-line react/prop-types
const FlightBookingsRouter = ({ addAlert }) => {
  useEffect(() => {
    const initiateAuthorization = () => {
      const token = document.cookie.split("token=")[1];
      if (token) {
        axios.defaults.headers.common["Authorization"] = token;
      }
    };
    initiateAuthorization();
  }, []);

  return (
    <>
      <FlightBookingsLayout>
        <Routes>
          <Route path="/" element={<BookingsComponent addAlert={addAlert} />} />
          <Route
            path="create_booking"
            element={<FlightBookings addAlert={addAlert} />}
          />
        </Routes>
      </FlightBookingsLayout>
    </>
  );
};

export default FlightBookingsRouter;
