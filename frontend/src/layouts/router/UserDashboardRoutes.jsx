import { Routes, Route } from "react-router-dom";
import UserDashboardLayout from "../UserDashboardLayout";
import UserDashboard from "../../pages/user/Dashboard/UserDashboard";
import FlightsSearchComponent from "../../pages/user/FlightsSearch"
import SeatSelection from "../../pages/user/Dashboard/SeatSelection"
import FlightBookingsRouter from "../router/FlightBookingsRoutes"

// eslint-disable-next-line react/prop-types
const UserDashboardRoutes = ({ addAlert }) => {
  return (
    <>
      <UserDashboardLayout>
        <Routes>
          <Route path="my_dashboard" element={<UserDashboard addAlert={addAlert}/>} />
          <Route path="bookings/*" element={<FlightBookingsRouter addAlert={addAlert} />} />
          <Route
            path="flight_search"
            element={<FlightsSearchComponent addAlert={addAlert} />} />
          <Route path="seats" element={<SeatSelection />} />
        </Routes>
      </UserDashboardLayout>
    </>
  );
};

export default UserDashboardRoutes;
